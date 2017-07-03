// -----------------------------------------------------------------
// Producto
// -----------------------------------------------------------------
export interface Product {
    nombre: string,
    codigo: string,
    key: string,
    descripcion: string,
    img?: string,
    subProductos?: string[]
}