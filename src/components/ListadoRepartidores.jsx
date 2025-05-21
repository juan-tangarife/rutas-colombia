import React, {useEffect, useState} from 'react'
import { 
  Table, 
  Card, 
  Tag, 
  Button, 
  Space, 
  Form, 
  Input, 
  Typography, 
  notification, 
  Cascader,
  Select,
  Drawer,
  Row,
  Col,
  Divider,
  Empty
} from 'antd';
import { 
  UserOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  FilterOutlined, 
  ReloadOutlined,
  CalendarOutlined,
  ShopOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const mockRepartidores = [
  { 
    id: 1, 
    nombre: 'Carlos Rodríguez', 
    departamento: 'Caldas', 
    ciudad: 'Manizales', 
    activo: true, 
    pedidosPendientes: 2,
    pedidosHoy: 1,
    telefono: '315-789-4561' 
  },
  { 
    id: 2, 
    nombre: 'Ana Martínez', 
    departamento: 'Caldas', 
    ciudad: 'Manizales', 
    activo: true, 
    pedidosPendientes: 0,
    pedidosHoy: 0,
    telefono: '300-456-7890' 
  },
  { 
    id: 3, 
    nombre: 'José Pérez', 
    departamento: 'Caldas', 
    ciudad: 'Chinchiná', 
    activo: false, 
    pedidosPendientes: 0,
    pedidosHoy: 0,
    telefono: '317-654-3210' 
  },
  { 
    id: 4, 
    nombre: 'María López', 
    departamento: 'Antioquia', 
    ciudad: 'Medellín', 
    activo: true, 
    pedidosPendientes: 1,
    pedidosHoy: 1,
    telefono: '310-123-4567' 
  },
  { 
    id: 5, 
    nombre: 'Pedro Gómez', 
    departamento: 'Cundinamarca', 
    ciudad: 'Bogotá', 
    activo: true, 
    pedidosPendientes: 3,
    pedidosHoy: 2,
    telefono: '321-987-6543' 
  }
];

const ubicacionesOptions = [
  {
    value: 'Caldas',
    label: 'Caldas',
    children: [
      {
        value: 'Manizales',
        label: 'Manizales',
      },
      {
        value: 'Chinchiná',
        label: 'Chinchiná',
      }
    ],
  },
  {
    value: 'Antioquia',
    label: 'Antioquia',
    children: [
      {
        value: 'Medellín',
        label: 'Medellín',
      }
    ],
  },
  {
    value: 'Cundinamarca',
    label: 'Cundinamarca',
    children: [
      {
        value: 'Bogotá',
        label: 'Bogotá',
      }
    ],
  }
];


const ListadoRepartidores = () => {
  const [repartidores, setRepartidores] = useState(mockRepartidores);
  const [filteredRepartidores, setFilteredRepartidores] = useState(mockRepartidores);
  const [pedidosDisponibles, setPedidosDisponibles] = useState(mockPedidos);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [repartidorSeleccionado, setRepartidorSeleccionado] = useState(null);
  const [ubicacionFilter, setUbicacionFilter] = useState([]);
  const [activoFilter, setActivoFilter] = useState(null);
  const [entregasHoyFilter, setEntregasHoyFilter] = useState(null);

    useEffect(() => {
    let filtered = [...repartidores];
    
    // Filtrar por departamento y ciudad si se ha seleccionado
    if (ubicacionFilter && ubicacionFilter.length > 0) {
      const departamento = ubicacionFilter[0];
      const ciudad = ubicacionFilter.length > 1 ? ubicacionFilter[1] : null;
      
      filtered = filtered.filter(rep => rep.departamento === departamento);
      
      if (ciudad) {
        filtered = filtered.filter(rep => rep.ciudad === ciudad);
      }
    }
    
    // Filtrar por estado activo/inactivo
    if (activoFilter !== null) {
      filtered = filtered.filter(rep => rep.activo === activoFilter);
    }
    
    // Filtrar por entregas de hoy
    if (entregasHoyFilter !== null) {
      if (entregasHoyFilter) {
        filtered = filtered.filter(rep => rep.pedidosHoy > 0);
      } else {
        filtered = filtered.filter(rep => rep.pedidosHoy === 0);
      }
    }
    
    setFilteredRepartidores(filtered);
  }, [repartidores, ubicacionFilter, activoFilter, entregasHoyFilter]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text) => <span><UserOutlined /> {text}</span>,
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
    },
    {
      title: 'Departamento',
      dataIndex: 'departamento',
      key: 'departamento',
    },
    {
      title: 'Ciudad',
      dataIndex: 'ciudad',
      key: 'ciudad',
    },
    {
      title: 'Estado',
      dataIndex: 'activo',
      key: 'activo',
      render: (activo) => (
        activo ? 
          <Tag color="green" icon={<CheckCircleOutlined />}>Activo</Tag> : 
          <Tag color="red" icon={<CloseCircleOutlined />}>Inactivo</Tag>
      ),
    },
    {
      title: 'Pedidos Pendientes',
      dataIndex: 'pedidosPendientes',
      key: 'pedidosPendientes',
      render: (count) => <Tag color={count > 0 ? 'blue' : 'default'}>{count}</Tag>,
    },
    {
      title: 'Entregas Hoy',
      dataIndex: 'pedidosHoy',
      key: 'pedidosHoy',
      render: (count) => (
        <Tag color={count > 0 ? 'orange' : 'default'} style={{ fontWeight: count > 0 ? 'bold' : 'normal' }}>
          {count}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            onClick={() => showAsignarPedidoDrawer(record)}
            disabled={!record.activo}
          >
            Asignar Pedido
          </Button>
          <Button 
            type={record.activo ? "danger" : "primary"} 
            onClick={() => toggleEstadoRepartidor(record)}
          >
            {record.activo ? 'Desactivar' : 'Activar'}
          </Button>
        </Space>
      ),
    },
  ];



  return (
    <div style={{ padding: '20px' }}>
</div>
  )
}

export default ListadoRepartidores