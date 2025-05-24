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

const { Title, Text } = Typography;

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

const mockPedidos = [
  { 
    id: 1, 
    cliente: 'Juan Castro', 
    direccion: 'Calle 10 #15-30', 
    ciudad: 'Manizales', 
    departamento: 'Caldas',
    fechaEntrega: '2025-05-20',
    almacen: {
      id: 101,
      nombre: 'SuperMarket Centro',
      direccion: 'Plaza Principal #33-45',
      telefono: '606-885-4321',
      contacto: 'Martín Soto'
    }
  },
  { 
    id: 2, 
    cliente: 'Laura Díaz', 
    direccion: 'Avenida 5 #20-15', 
    ciudad: 'Manizales', 
    departamento: 'Caldas',
    fechaEntrega: '2025-05-21',
    almacen: {
      id: 102,
      nombre: 'MercadoExpress Chipre',
      direccion: 'Carrera 8 #12-05',
      telefono: '606-887-6543',
      contacto: 'Carmen Valencia'
    }
  },
  { 
    id: 3, 
    cliente: 'Ricardo Álvarez', 
    direccion: 'Carrera 7 #8-12', 
    ciudad: 'Medellín', 
    departamento: 'Antioquia',
    fechaEntrega: '2025-05-20',
    almacen: {
      id: 201,
      nombre: 'SuperTienda El Poblado',
      direccion: 'Calle 10 #43-23',
      telefono: '604-234-5678',
      contacto: 'Juan Restrepo'
    }
  },
  { 
    id: 4, 
    cliente: 'Diana Torres', 
    direccion: 'Calle 45 #23-10', 
    ciudad: 'Bogotá', 
    departamento: 'Cundinamarca',
    fechaEntrega: '2025-05-20',
    almacen: {
      id: 301,
      nombre: 'MegaMarket Chapinero',
      direccion: 'Carrera 13 #63-40',
      telefono: '601-321-7654',
      contacto: 'Patricia Gómez'
    }
  },
  { 
    id: 5, 
    cliente: 'Fernando Gil', 
    direccion: 'Carrera 12 #34-56', 
    ciudad: 'Chinchiná', 
    departamento: 'Caldas',
    fechaEntrega: '2025-05-22',
    almacen: {
      id: 103,
      nombre: 'MiniMarket La Estación',
      direccion: 'Avenida Ferrocarril #12-30',
      telefono: '606-850-1234',
      contacto: 'Roberto Sánchez'
    }
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

  const getPedidosPorCiudad = (ciudad) => {
    return pedidosDisponibles.filter(pedido => 
      pedido.ciudad === ciudad
    );
  };

  const showAsignarPedidoDrawer = (repartidor) => {
    if (!repartidor.activo) {
      notification.warning({
        message: 'Repartidor Inactivo',
        description: 'No se pueden asignar pedidos a repartidores inactivos.',
      });
      return;
    }
    
    setRepartidorSeleccionado(repartidor);
    const pedidosCiudad = getPedidosPorCiudad(repartidor.ciudad);
    
    if (pedidosCiudad.length === 0) {
      notification.info({
        message: 'Sin Pedidos Disponibles',
        description: `No hay pedidos disponibles en ${repartidor.ciudad} para asignar.`,
      });
      return;
    }
    
    // Limpiar selección anterior
    setPedidoSeleccionado(null);
    setDrawerVisible(true);
  };

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

  // Seleccionar un pedido 
  const handleSelectPedido = (pedido) => {
    setPedidoSeleccionado(pedido);
  };

  // Manejar la asignación del pedido
  const handleAsignarPedido = () => {
    if (!pedidoSeleccionado) {
      notification.error({
        message: 'Error',
        description: 'Por favor seleccione un pedido para asignar.',
      });
      return;
    }
      
    // Actualizar la lista de pedidos disponibles (eliminar el asignado)
    setPedidosDisponibles(pedidosDisponibles.filter(p => p.id !== pedidoSeleccionado.id));
    
    // Determinar si el pedido es para hoy
    const fechaHoy = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const esParaHoy = pedidoSeleccionado.fechaEntrega === fechaHoy;
    
    // Actualizar el contador de pedidos pendientes del repartidor
    const updatedRepartidores = repartidores.map(rep => {
      if (rep.id === repartidorSeleccionado.id) {
        return { 
          ...rep, 
          pedidosPendientes: rep.pedidosPendientes + 1,
          pedidosHoy: esParaHoy ? rep.pedidosHoy : rep.pedidosHoy
        };
      }
      return rep;
    });
    
    setRepartidores(updatedRepartidores);
    
    notification.success({
      message: 'Pedido Asignado',
      description: `Pedido #${pedidoSeleccionado.id} asignado a ${repartidorSeleccionado.nombre} exitosamente.`,
    });
    
    setDrawerVisible(false);
    setPedidoSeleccionado(null);
  };


  const toggleEstadoRepartidor = (repartidor) => {
    const updatedRepartidores = repartidores.map(rep => {
      if (rep.id === repartidor.id) {
        return { ...rep, activo: !rep.activo };
      }
      return rep;
    });
    
    setRepartidores(updatedRepartidores);
    
    notification.success({
      message: 'Estado Actualizado',
      description: `${repartidor.nombre} ahora está ${!repartidor.activo ? 'activo' : 'inactivo'}.`,
    });
  };
  
  const resetFilters = () => {
    setUbicacionFilter([]);
    setActivoFilter(null);
    setEntregasHoyFilter(null);
  };

  const renderPedidoCard = (pedido) => {
    const fechaHoy = new Date().toISOString().split('T')[0];
    const esHoy = pedido.fechaEntrega === fechaHoy;
    const isSelected = pedidoSeleccionado && pedidoSeleccionado.id === pedido.id;
    
    return (
      <Card 
        key={pedido.id}
        style={{ 
          marginBottom: '16px', 
          cursor: 'pointer',
          border: isSelected ? '2px solid #1890ff' : '1px solid #f0f0f0',
          boxShadow: isSelected ? '0 2px 8px rgba(24, 144, 255, 0.3)' : 'none'
        }}
        hoverable
        onClick={() => handleSelectPedido(pedido)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <Tag color="blue">Pedido #{pedido.id}</Tag>
            {esHoy && <Tag color="red">HOY</Tag>}
          </div>
          {isSelected && <Tag color="green">Seleccionado</Tag>}
        </div>
        
        <p><strong>Cliente:</strong> {pedido.cliente}</p>
        <p><EnvironmentOutlined /> <strong>Dirección:</strong> {pedido.direccion}</p>
        <p><CalendarOutlined /> <strong>Fecha Entrega:</strong> {pedido.fechaEntrega}</p>
        
        <Divider style={{ margin: '10px 0' }} />
        
        <div style={{ backgroundColor: '#fafafa', padding: '10px', borderRadius: '4px' }}>
          <p style={{ margin: 0 }}><ShopOutlined /> <strong>Almacén:</strong> {pedido.almacen.nombre}</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
            <PhoneOutlined /> {pedido.almacen.telefono} • <UserOutlined /> {pedido.almacen.contacto}
          </p>
        </div>
      </Card>
    );
  };
  

  return (
    <div style={{ padding: '20px' }}>
        <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Title level={4}>Gestión de Repartidores</Title>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={resetFilters}>
                Resetear Filtros
              </Button>
            </Space>
          </Space>
          
          <Space style={{ marginBottom: '16px' }}>
            <Text strong><FilterOutlined /> Filtros:</Text>
            <Cascader
              options={ubicacionesOptions}
              onChange={value => setUbicacionFilter(value)}
              placeholder="Departamento / Ciudad"
              value={ubicacionFilter}
              style={{ width: 250 }}
            />
            <Select
              placeholder="Estado"
              style={{ width: 120 }}
              onChange={value => setActivoFilter(value)}
              value={activoFilter}
              allowClear
            >
              <Select.Option value={true}>Activo</Select.Option>
              <Select.Option value={false}>Inactivo</Select.Option>
            </Select>
            <Select
              placeholder="Entregas Hoy"
              style={{ width: 150 }}
              onChange={value => setEntregasHoyFilter(value)}
              value={entregasHoyFilter}
              allowClear
            >
              <Select.Option value={true}>Con entregas hoy</Select.Option>
              <Select.Option value={false}>Sin entregas hoy</Select.Option>
            </Select>
          </Space>
          
          <Table 
            columns={columns} 
            dataSource={filteredRepartidores} 
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Space>
      </Card>
      <Drawer 
        title={`Asignar Pedido a ${repartidorSeleccionado ? repartidorSeleccionado.nombre : ''}`}
        width={650}
        placement="right"
        onClose={() => {
          setDrawerVisible(false);
          setPedidoSeleccionado(null);
        }}
        open={drawerVisible}
        extra={
          <Space>
            <Button onClick={() => {
              setDrawerVisible(false);
              setPedidoSeleccionado(null);
            }}>
              Cancelar
            </Button>
            <Button 
              type="primary" 
              onClick={handleAsignarPedido}
              disabled={!pedidoSeleccionado}
            >
              Asignar Pedido
            </Button>
          </Space>
        }
      >
        {repartidorSeleccionado && (
          <>
            <Card style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <UserOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
                <div>
                  <Typography.Title level={5} style={{ margin: 0 }}>{repartidorSeleccionado.nombre}</Typography.Title>
                  <Typography.Text type="secondary">{repartidorSeleccionado.telefono}</Typography.Text>
                </div>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <p><EnvironmentOutlined /> <strong>Ubicación:</strong> {repartidorSeleccionado.ciudad}, {repartidorSeleccionado.departamento}</p>
              <Space>
                <Tag color="blue">Pedidos Pendientes: {repartidorSeleccionado.pedidosPendientes}</Tag>
                <Tag color="orange">Entregas Hoy: {repartidorSeleccionado.pedidosHoy}</Tag>
              </Space>
            </Card>
            
            <Typography.Title level={5}>
              <Space>
                <ShoppingCartOutlined />
                Pedidos Disponibles en {repartidorSeleccionado.ciudad}
              </Space>
            </Typography.Title>
            
            <div style={{ marginBottom: '16px' }}>
              <Row>
                <Col span={24}>
                  <Typography.Text type="secondary">
                    <InfoCircleOutlined /> Selecciona el pedido que deseas asignar a este repartidor
                  </Typography.Text>
                </Col>
              </Row>
            </div>
            
            {getPedidosPorCiudad(repartidorSeleccionado.ciudad).length > 0 ? (
              getPedidosPorCiudad(repartidorSeleccionado.ciudad).map(pedido => renderPedidoCard(pedido))
            ) : (
              <Empty description="No hay pedidos disponibles para esta ciudad" />
            )}
          </>
        )}
      </Drawer>
</div>
  )
}

export default ListadoRepartidores