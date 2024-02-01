import * as yup from 'yup';
import { ClientCreate, ClientUpdate } from '../../core';

/**
 * Classe para validar dados do cliente.
 */
export class ClientValidator {
  /**
   * Valida os dados para criar um cliente.
   * @param data - Dados do cliente a serem validados.
   */
  public static async validateCreateClient(data: ClientCreate): Promise<void> {
    // Coloque aqui a lógica de validação para criar um cliente.
    // Você pode lançar erros com mensagens de validação se os dados não forem válidos.
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().test('valid-phone', 'Telefone inválido', (value) => {
        if (!value) return true;
        const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)?(?:9\s?)?([0-9]{4,5}-?[0-9]{4})$/;
        return phoneRegex.test(value);
      }),
      latitude: yup.number().min(-90).max(90),
      longitude: yup.number().min(-180).max(180),
    });

    await schema.validate(data, { abortEarly: false });
  }

  /**
   * Valida os dados para atualizar um cliente.
   * @param data - Dados do cliente a serem validados.
   */
  public static async validateUpdateClient(data: ClientUpdate): Promise<void> {
    // Coloque aqui a lógica de validação para atualizar um cliente.
    // Você pode lançar erros com mensagens de validação se os dados não forem válidos.
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      phone: yup.string().test('valid-phone', 'Telefone inválido', (value) => {
        if (!value) return true;
        const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([0-9]{2})\)?\s?)?(?:9\s?)?([0-9]{4,5}-?[0-9]{4})$/;
        return phoneRegex.test(value);
      }),
      latitude: yup.number().min(-90).max(90),
      longitude: yup.number().min(-180).max(180),
    });

    await schema.validate(data, { abortEarly: false });
  }
}
