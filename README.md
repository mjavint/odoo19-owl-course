🚀 **Curso completo y gratuito de Owl 2 en Odoo 19**
[![Lista de Youtube](miniatura.png)](https://www.youtube.com/playlist?list=PLGPKbeX3NwWCJFInep8UOxWisZyVwxTB1)
Aprende a desarrollar con la biblioteca reactiva OWL 2 en Odoo 19 desde la instalación hasta pruebas unitarias profesionales. 9 clases prácticas.

#### 📚 Contenido del Curso:

- Clase 1: Instalación y configuración completa
- Clase 2: Componentes OWL - Props, State, Ciclo de vida
- Clase 3: Registro de componentes - Actions, Views, Widgets
- Clase 4: Servicios
- Clase 5: Hooks personalizados y reutilización de código
- Clase 6: Patching - Extender código sin modificar el core
- Clase 7: Templates QWeb - Directivas y mejores prácticas
- Clase 8: Manejo de errores
- Clase 9: Testing unitario y de integración con Hoot

#### Master Password

`88mr-i2sy-jenm`

#### Comandos útiles

> Crear el Role de odoo en Postgres desde el contenedor de odoo

```shell
psql -h pgdb17 -U postgres -c "CREATE USER odoo WITH PASSWORD 'odoo' CREATEDB NOSUPERUSER NOREPLICATION;"
```

> Eliminar el role

```shell
psql -h pgdb17 -U postgres -c "DROP USER IF EXISTS odoo;"
```

#### Ciclo de Vida del Componente

Constructor
↓
setup() - Configuración inicial
↓
willStart() - Antes del primer render (async)
↓
[Primer Renderizado]
↓
mounted() - Después del primer render
↓
[Componente activo]
↓
willPatch() - Antes de actualizar
↓
[Re-renderizado]
↓
patched() - Después de actualizar
↓
willUnmount() - Antes de destruir
↓
destroy() - Componente destruido

#### Registry

Para usarlo, siempre importamos lo mismo:
```javascript
import { registry } from "@web/core/registry";
```

Y la estructura siempre es:
1. Elegimos la **categoría** (actions, fields, services, etc.).
2. Usamos el método `.add()`.
3. Le damos un nombre único y el componente que queremos guardar.

```javascript
registry.category("categoria").add("nombre_unico", MiComponente);
```
¡Es así de simple!"

