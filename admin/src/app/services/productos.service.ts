import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Producto } from 'src/app/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private static API_PRODUCTOS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/productos`;

  constructor() { }

  getProductos() {
    return $.get(ProductosService.API_PRODUCTOS).then((array: any[]) => {
      return array.map(producto => {
        return new Producto(
          parseInt(producto.id),
          producto.nombre,
          producto.categoria.split(','),
          producto.descripcion,
          producto.foto,
          Boolean(Number(producto.destacado)), // "0" es true, por lo que hace falta pasarlo a 0 primero
          parseInt(producto.precio)
        );
      });
    });
  }

  crearProducto(producto: Producto) {
    delete producto.id;

    return $.ajax({
      type: 'POST',
      url: ProductosService.API_PRODUCTOS,
      contentType: 'application/json',
      data: JSON.stringify(producto),
      xhrFields: {
        withCredentials: true
      }
    });
  }

  editarProducto(producto: Producto) {
    return $.ajax({
      type: 'PUT',
      url: `${ProductosService.API_PRODUCTOS}/${producto.id}`,
      contentType: 'application/json',
      data: JSON.stringify(producto),
      xhrFields: {
        withCredentials: true
      }
    });
  }

  borrarProducto(producto: Producto) {    
    return $.ajax({
      type: 'DELETE',
      url: `${ProductosService.API_PRODUCTOS}/${producto.id}`,
      contentType: 'application/json',
      data: JSON.stringify(producto),
      xhrFields: {
        withCredentials: true
      }
    });
  }
}
