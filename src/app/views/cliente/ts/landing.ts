$(() => {
    var importGlide = '<script src="js/libs/glide-3.2.4/glide.min.js"></script>';
    if (!$(".p-principal").html().endsWith(importGlide))
        $(".p-principal").html($(".p-principal").html() + importGlide)
        $.when(cargarDatosDesde("/api/portada")).then(
            () => {
                generarCarrusel("js-carrusel")
            }
        )
    
})

$('.js-boton-menu').on('click', () => {
    $('.js-menu').toggleClass('c-menu--oculto');
});

function cargarDatosDesde(url) {
    return $.getJSON(url).then(
        (datos) => {
            $(".c-principal").html(JSON.parse(datos)["Contenido"]);
            return $.getJSON(url.replace("/api/", "/api/menu/")).then(
                (datos) => {
                    $(".js-menu").html(JSON.parse(datos)["Contenido"]);
                    return true
                }
            )
        }
    )
}