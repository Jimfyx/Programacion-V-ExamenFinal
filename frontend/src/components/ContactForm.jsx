import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  Stack
} from '@mui/material';
import { createContact } from '../services/contactService';

const ContactForm = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    type: '',
    message: ''
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const types = ['Informacion', 'Queja', 'Consulta', 'Soporte'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.first_name || !form.email || !form.type || !form.message) {
      setAlert({ open: true, message: 'Por favor completa todos los campos obligatorios.', severity: 'warning' });
      return;
    }

    try {
      setIsSubmitting(true);
      await createContact(form); // Usa el servicio externo
      setAlert({ open: true, message: 'Mensaje enviado exitosamente.', severity: 'success' });
      setForm({ first_name: '', last_name: '', email: '', type: '', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al enviar el mensaje.';
      setAlert({ open: true, message: errorMsg, severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Formulario de Contacto
          </Typography>


          <Stack spacing={2} mt={3}>
            {alert.open && (
              <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                {alert.message}
              </Alert>
            )}

            <TextField
              name="first_name"
              label="Nombre *"
              value={form.first_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="last_name"
              label="Apellido"
              value={form.last_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="email"
              label="Correo electrónico *"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="type-label">Tipo *</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={form.type}
                label="Tipo *"
                onChange={handleChange}
              >
                {types.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="message"
              label="Mensaje *"
              multiline
              rows={4}
              value={form.message}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 500 }}
              helperText={`${form.message.length}/500 caracteres`}
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactForm;
