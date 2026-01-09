/** @odoo-module **/

import { Component, onWillStart, useState } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { useService } from '@web/core/utils/hooks';

export class Posts extends Component {
  static template = 'owl_course.Posts';

  setup() {
    // Inyectamos el servicio fakeApi
    this.fakeApi = useService('fakeApi');

    // Agregamos el estado inicial
    this.state = useState({
      allPosts: [],
      filteredPosts: [],
      posts: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      error: null,
      searchText: '',
    });

    // Método para cargar todos los posts
    onWillStart(async () => await this.loadAllPosts());
  }

  async loadAllPosts() {
    // Utilizamos el servicio fakeApi para obtener los posts
    const result = await this.fakeApi.fetchPosts();

    if (result.error) {
      this.state.error = result.error;
      return;
    }
    this.state.allPosts = result.posts;
    this.state.totalItems = result.posts.length;
    this.applyFiltersAndPagination();
  }

  applyFiltersAndPagination() {
    let filtered = this.state.allPosts;

    // Filtrar por texto de búsqueda
    if (this.state.searchText) {
      const searchLower = this.state.searchText.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.body.toLowerCase().includes(searchLower) ||
          post.userId.toString().includes(searchLower)
      );
    }
    this.state.filteredPosts = filtered;

    // Aplicar paginación
    const start = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const end = start + this.state.itemsPerPage;
    this.state.posts = this.state.filteredPosts.slice(start, end);
  }

  onSearchInput(event) {
    this.state.searchText = event.target.value;
    this.state.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  changeItemsPerPage(event) {
    this.state.itemsPerPage = parseInt(event.target.value);
    this.state.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  // Ir a una página específica
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.state.currentPage = page;
      this.applyFiltersAndPagination();
    }
  }

  clearFilters() {
    this.state.searchText = '';
    this.state.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  // Métodos de paginación
  nextPage() {
    const totalFiltered = this.state.filteredPosts.length;
    if (this.state.currentPage * this.state.itemsPerPage < totalFiltered) {
      this.state.currentPage += 1;
      this.applyFiltersAndPagination();
    }
  }

  prevPage() {
    if (this.state.currentPage > 1) {
      this.state.currentPage -= 1;
      this.applyFiltersAndPagination();
    }
  }

  // Formateo para UI
  get totalPages() {
    return Math.ceil(this.state.filteredPosts.length / this.state.itemsPerPage);
  }

  get fromItems() {
    return (this.state.currentPage - 1) * this.state.itemsPerPage + 1;
  }

  get toItems() {
    return Math.min(
      this.state.currentPage * this.state.itemsPerPage,
      this.state.filteredPosts.length
    );
  }
}

registry.category('actions').add('posts', Posts);
