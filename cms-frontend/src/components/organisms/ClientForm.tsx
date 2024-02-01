import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ClientCreate, GetAutocompletePlaces } from '../../services/entities';
import AutocompleteComponent from '../molecules/AutocompleteComponent';

// Esquema de validação do Yup
const schema = yup
  .object({
    name: yup
      .string()
      .required('Nome é obrigatório')
      .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Nome e sobrenome são necessários'),
    email: yup.string().required('Email é obrigatório').email('Email inválido'),
    phone: yup
      .string()
      .required('Telefone é obrigatório')
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  })
  .required();

type ClientFormProps = {
  handleClose: () => void;
  onSubmit: (data: ClientCreate) => void;
};

const ClientForm = ({ handleClose, onSubmit }: ClientFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ClientCreate>({
    resolver: yupResolver(schema),
  });

  const handleLocationSelect = (location: GetAutocompletePlaces) => {
    setValue('latitude', location.lat);
    setValue('longitude', location.lng);
  };

  return (
    <Stack
      component="form"
      spacing={3}
      minWidth={560}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Telefone"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1">Geolocalização</Typography>
        <AutocompleteComponent onLocationSelect={handleLocationSelect} />
      </Box>

      <Button type="submit" variant="contained" color="primary">
        Adicionar
      </Button>
    </Stack>
  );
};

export default ClientForm;
