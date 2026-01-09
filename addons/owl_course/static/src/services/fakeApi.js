/** @odoo-module */

import { registry } from '@web/core/registry';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fakeApi = {
  dependencies: ['http', 'notification'],
  start(env, { http, notification }) {
    async function fetchPosts() {
      try {
        const allPosts = await http.get(`${API_BASE_URL}/posts`);

        // Validar que la respuesta es un array
        if (!Array.isArray(allPosts)) {
          throw new Error('Invalid response format: expected an array of posts');
        }

        // Notificamos el éxito de la operación
        notification.add('Posts fetched successfully!', {
          type: 'success',
          title: 'Charge Complete',
        });

        return {
          posts: allPosts,
          error: null,
          loading: false,
        };
      } catch (error) {
        notification.add(`Failed to fetch posts: ${error.message}`, {
          type: 'danger',
        });
        return {
          posts: [],
          error: error.message,
          loading: false,
        };
      }
    }
    return { fetchPosts };
  },
};

registry.category('services').add('fakeApi', fakeApi);
