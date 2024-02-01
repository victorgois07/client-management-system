import {
  AppBar,
  Button,
  Container,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ClientForm from '../components/organisms/ClientForm'; // Importe o formulário de cliente
import ClientTable from '../components/organisms/ClientTable';
import { ClientCreate } from '../services/entities';

const HomePage = () => {
  const [open, setOpen] = useState(false); // Estado para controlar o modal

  const handleOpen = () => setOpen(true); // Abrir modal
  const handleClose = () => setOpen(false); // Fechar modal
  const onSubmit = (data: ClientCreate) => {
    console.log(data);
    handleClose();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gerenciamento de Clientes
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo ao Sistema de Gerenciamento de Clientes
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ marginBottom: '20px' }}
        >
          Adicionar Cliente
        </Button>
        <Drawer anchor="right" open={open} onClose={handleClose}>
          <Stack spacing={3} padding={3}>
            <ClientForm handleClose={handleClose} onSubmit={onSubmit} />
          </Stack>
        </Drawer>
        <ClientTable />
      </Container>
    </div>
  );
};

export default HomePage;
