# 📸 CÓMO AGREGAR IMÁGENES REALES DE INSTAGRAM

Sigue estos pasos para reemplazar todas las imágenes placeholder con fotos reales de los tatuajes.

## ⚡ MÉTODO RÁPIDO (5 minutos por artista)

### Paso 1: Descargar imágenes de Instagram

**Opción A - Con extensión (MÁS FÁCIL):**

1. Instala: [Instagram Downloader para Chrome](https://chrome.google.com/webstore/search/instagram%20downloader)
2. Ve a los perfiles:
   - https://www.instagram.com/isabellatattoo_/
   - https://www.instagram.com/barragan_tattoo/
   - https://www.instagram.com/cabeto.sanchez/
3. Haz clic en "Download" en cada foto que quieras

**Opción B - Screenshot:**

1. Abre Instagram en navegador
2. Haz clic en una foto para agrandarla
3. Click derecho → "Guardar imagen como..."

### Paso 2: Organizar las imágenes

Descarga y guarda las imágenes en estas carpetas:

```
public/images/
├── avatars/
│   ├── isabela.jpg          ← Foto de perfil de Isabela
│   ├── barragan.jpg         ← Foto de perfil de Barragan
│   └── cabeto.jpg           ← Foto de perfil de Cabeto
│
└── artists/
    ├── isabela/
    │   ├── 1.jpg            ← Tatuaje 1 de Isabela
    │   ├── 2.jpg            ← Tatuaje 2
    │   └── 3.jpg            ← Tatuaje 3
    │
    ├── barragan/
    │   ├── 1.jpg            ← Tatuaje 1 de Barragan
    │   ├── 2.jpg
    │   └── 3.jpg
    │
    └── cabeto/
        ├── 1.jpg            ← Tatuaje 1 de Cabeto
        ├── 2.jpg
        └── 3.jpg
```

### Paso 3: YA ESTÁ! 🎉

Una vez que las imágenes estén en las carpetas, el sitio las usará automáticamente en:
- ✅ Página de inicio
- ✅ Listado de artistas
- ✅ Páginas individuales
- ✅ Portfolio

## 📋 Checklist

### Isabela
- [ ] Descargada foto de perfil → `public/images/avatars/isabela.jpg`
- [ ] Descargados 3 tatuajes → `public/images/artists/isabela/1.jpg`, `2.jpg`, `3.jpg`

### Barragan
- [ ] Descargada foto de perfil → `public/images/avatars/barragan.jpg`
- [ ] Descargados 3 tatuajes → `public/images/artists/barragan/1.jpg`, `2.jpg`, `3.jpg`

### Cabeto
- [ ] Descargada foto de perfil → `public/images/avatars/cabeto.jpg`
- [ ] Descargados 3 tatuajes → `public/images/artists/cabeto/1.jpg`, `2.jpg`, `3.jpg`

## 💡 Consejos

- **Formato:** JPG (más liviano) o PNG
- **Tamaño mínimo:** 800x800px
- **Nombres:** Sin espacios, sin tildes
- **Calidad:** Alta resolución

## 🆘 Si tienes problemas

1. Verifica que las carpetas existan: `public/images/avatars/` y `public/images/artists/[nombre]/`
2. Asegúrate de que los nombres sean EXACTOS: `isabela.jpg`, `barragan.jpg`, `cabeto.jpg`
3. Recarga el navegador con Ctrl+Shift+R (o Cmd+Shift+R en Mac)

---

**Tiempo total:** ~15 minutos para los 3 artistas
