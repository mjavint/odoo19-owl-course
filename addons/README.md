# Herencia vs Patch en Odoo (extends vs patch)

## Ejemplo de Herencia en Odoo

**Problema 1: `kpi_dashboard`**

> Nuestro cliente quiere un dashboard interno con tres tipos de tarjetas KPI:

1. **Tarjeta simple**: Muestra un ícono, un título y un valor. Ejemplo: 'Total
   Contactos: 142'.

2. **Tarjeta con tendencia**: Igual que la simple, pero además muestra la variación
   respecto al periodo anterior. Ejemplo: 'Ventas: $54,300 ↑ 12.5%'.

3. **Tarjeta de progreso**: Igual que la simple, pero muestra una barra de progreso
   hacia un objetivo. Ejemplo: 'Meta mensual: $40,000 de $50,000 (80%)'.

## Ejemplo de Patch en Odoo

**Problema 2: `feedback_notification`**

> El equipo de ventas se queja de lo siguiente:

1. **Al guardar un registro** no hay feedback visual claro — solo un cambio sutil en la
   URL. Quieren una notificación de éxito/error.

2. **Al eliminar un registro** no hay confirmación — un clic accidental y adiós datos.
   Quieren un diálogo de confirmación.

3. **Al abrir un registro desde la lista** quieren ver cuál se está abriendo.
