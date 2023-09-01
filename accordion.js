// ===============================================================
// Hacking the Aventri Website Builder to make an accessible accordion module
// ===============================================================

$(function() {
    function openAccordion($this, item) {
        $this.attr('aria-expanded', 'true')
        item.addClass('active')
            .find('.ipBlock > .ipWidget:first-child ~ .ipWidget')
                .slideDown(300)
                .attr('aria-hidden', 'false');
    };

    function closeAccordion($this, item) {
        $this.attr('aria-expanded', 'false')
        item.removeClass('active')
            .find('.ipBlock > .ipWidget:first-child ~ .ipWidget')
                .slideUp(300)
                .attr('aria-hidden', 'true');
    };

    // set up accessibility features
    $('.accordion .ipWidget-CKEditor:first-child')
        .attr('aria-expanded', 'false')
        .attr('role', 'tab');
    $('.accordion .ipWidget-CKEditor:not(:first-child)')
        .attr('aria-hidden', 'true')
        .attr('role', 'tabpanel');

    let counter = 0;
    $('.accordion .column').each(function() {
        const $this = $(this);
        $this.find('.ipWidget-CKEditor:first-child').attr('aria-controls', `content-${counter}`)
        $this.find('.ipWidget-CKEditor:not(:first-child)').prop('id', `content-${counter}`);
        counter++;
    });

    // create the event handler and vars
    $('.accordion').on('click', '.column .ipBlock > .ipWidget:first-child', function(e) {
        e.preventDefault();
        const   $this = $(this),
                accordion = $this.parents('.accordion'),
                allCols = accordion.find('.column'),
                thisCols = $this.parents('.column');

        // Do the things
        if (thisCols.hasClass('active')) {
            closeAccordion($this, thisCols);
        } else {
            closeAccordion($this, allCols); // turn this off to allow multiple open accordions
            openAccordion($this, thisCols);
        }
    });
}());