# Nuestro primer mes

Página web de regalo para mi pareja.

## Cómo abrirla
1. Abre esta carpeta en Visual Studio Code (Archivo > Abrir carpeta).
2. Instala la extensión **Live Server** (de Ritwick Dey).
3. Clic derecho sobre `index.html` > **Open with Live Server**. La página se recarga sola cada vez que guardas.

También puedes abrir `index.html` con doble clic en el navegador.

## Qué editar
- `script.js`: al inicio está el objeto `CONFIG`. Ahí cambias el nombre de ella, tu nombre, la fecha de inicio, el texto de la carta, las canciones, sus enlaces de Spotify, las tarjetas de gustos y las seis razones.
- Los discos controlan los reproductores oficiales de Spotify. Se necesita conexión a internet; la disponibilidad y el inicio de reproducción dependen de Spotify y de la cuenta del visitante.
- `styles.css`: los colores están al inicio, en `:root` (`--rose`, `--petal`, `--berry`, `--lilac`...).
- `index.html`: la estructura de las secciones y los títulos.

## Para fotos propias
Crea una carpeta `img/`, guarda ahí tus fotos y agrégalas en `index.html` con una etiqueta `<img src="img/foto1.jpg" alt="Nosotros">`.

## Publicación en GitHub Pages
El repositorio publica automáticamente esta carpeta en GitHub Pages cuando se actualiza la rama `main`. Antes de la primera publicación, habilita Pages en **Settings > Pages**, seleccionando **GitHub Actions** como origen. Después puedes iniciar la publicación manualmente desde **Actions > Deploy to GitHub Pages > Run workflow**.

Cuando termine correctamente el workflow, encontrarás el enlace en **Settings > Pages** y en el resumen de la ejecución.
