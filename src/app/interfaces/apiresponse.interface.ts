/**
 * Interfaz genérica para manejar respuestas de la API.
 * 
 * @template T - Tipo de datos esperado en la respuesta de la API.
 */
export interface ApiResponse<T> {
  
  /**
   * Indica si la operación fue exitosa o no.
   * - `true`: La operación se realizó correctamente.
   * - `false`: Hubo un error en la operación.
   */
  status: boolean;

  /**
   * Mensaje descriptivo sobre el resultado de la operación.
   * - Puede ser un mensaje de éxito o de error según el valor de `status`.
   * - Ejemplo:
   *   - `"Operación realizada con éxito."`
   *   - `"Error: El producto no pudo ser creado."`
   */
  msg: string;

  /**
   * Datos devueltos por la API.
   * - El tipo `T` permite que esta propiedad sea flexible y pueda contener
   *   diferentes tipos de datos según la solicitud realizada.
   * - Ejemplo:
   *   - Si la API devuelve un solo producto: `ApiResponse<Product>`
   *   - Si devuelve una lista de productos: `ApiResponse<Product[]>`
   */
  data: T;
}
