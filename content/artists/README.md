# Cómo agregar posts de Instagram a los perfiles de artistas

Este documento explica cómo agregar posts reales de Instagram que se mostrarán en las páginas de cada artista.

## Paso a paso

### 1. Obtener URLs de posts de Instagram

Para cada artista:

1. **Visita su perfil de Instagram:**
   - Isabela: https://www.instagram.com/isabellatattoo_/
   - Barragan: https://www.instagram.com/barragan_tattoo/
   - Cabeto: https://www.instagram.com/cabeto.sanchez/

2. **Selecciona los posts que quieres mostrar:**
   - Busca posts que muestren bien el estilo del artista
   - Recomendamos 3-6 posts por artista

3. **Copia la URL de cada post:**
   - Haz clic en el post para abrirlo
   - Copia la URL de la barra de direcciones
   - Ejemplo: `https://www.instagram.com/p/DDcBRZGOmQx/`

### 2. Agregar URLs a los archivos MDX

Edita el archivo del artista correspondiente:

**Para Isabela** (`content/artists/isabela.mdx`):
```yaml
instagramPosts:
  - "https://www.instagram.com/p/URL_DEL_POST_1/"
  - "https://www.instagram.com/p/URL_DEL_POST_2/"
  - "https://www.instagram.com/p/URL_DEL_POST_3/"
```

**Para Barragan** (`content/artists/barragan.mdx`):
```yaml
instagramPosts:
  - "https://www.instagram.com/p/URL_DEL_POST_1/"
  - "https://www.instagram.com/p/URL_DEL_POST_2/"
  - "https://www.instagram.com/p/URL_DEL_POST_3/"
```

**Para Cabeto** (`content/artists/cabeto.mdx`):
```yaml
instagramPosts:
  - "https://www.instagram.com/p/URL_DEL_POST_1/"
  - "https://www.instagram.com/p/URL_DEL_POST_2/"
  - "https://www.instagram.com/p/URL_DEL_POST_3/"
```

### 3. Verificar

Una vez agregadas las URLs:

1. Guarda el archivo MDX
2. El servidor de desarrollo recargará automáticamente
3. Visita la página del artista en: `http://localhost:3000/artists/[slug]`
4. Deberías ver los posts de Instagram embebidos

## Características

✅ **Los posts se actualizan automáticamente** - Si el artista edita o elimina un post, el cambio se reflejará en el sitio

✅ **Totalmente responsive** - Los embeds se adaptan a todos los tamaños de pantalla

✅ **Carga bajo demanda** - Los embeds se cargan solo cuando el usuario visita la página

## Ejemplo completo

```yaml
---
name: "Isabela"
slug: "isabela"
bio: "Artista especializada en tatuajes delicados..."
instagram: "https://www.instagram.com/isabellatattoo_/"
instagramPosts:
  - "https://www.instagram.com/p/DDcBRZGOmQx/"
  - "https://www.instagram.com/p/DDWqPiLuHp-/"
  - "https://www.instagram.com/p/DDUNjvSOyJP/"
---
```

## Notas importantes

- **URLs válidas**: Asegúrate de copiar la URL completa del post
- **Posts públicos**: Solo funcionarán posts públicos (no privados)
- **Formato correcto**: Las URLs deben estar entre comillas dobles
- **Límite recomendado**: 3-6 posts por artista para mejor rendimiento

## ¿Qué pasa si no agrego posts?

Si dejas el campo `instagramPosts` vacío o comentado, la página del artista mostrará un botón llamativo para visitar su perfil de Instagram en lugar de los embeds.

## Soporte

Si tienes problemas agregando posts:
1. Verifica que la URL sea correcta
2. Asegúrate de que el post sea público
3. Revisa que el formato YAML sea correcto (sin espacios extra)
