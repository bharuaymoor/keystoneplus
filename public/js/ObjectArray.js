function defer(method) {
    if (window.$)
        method();
    else
        setTimeout(function() {
            defer(method)
        }, 50);
}

var i = 1000
defer(function() {
    jQuery(function($) {
        $('.field.type-nosuchaclass .btn.btn-add-item.btn-myadditem, .field.type-numberarray .btn.btn-add-item').on("click", function(e) {
            e.preventDefault();
            var copy = $(this).parent().parent().children(":first").clone();
            copy.css( "display", "inline" );

            copy.find('input').each(function () {
                $(this).attr( "name", $(this).attr("name") + "." + i );
            });

            copy.find('label').text("" + i);

            $(this).before((copy));//
            
            i = i + 1;
        });

        $('.field.type-nosuchaclass, .field.type-numberarray').on("click", ".btn.btn-remove-item", function(e) {
            e.preventDefault();
            $(this).parent().parent().parent().remove();
        });
    
    });
});