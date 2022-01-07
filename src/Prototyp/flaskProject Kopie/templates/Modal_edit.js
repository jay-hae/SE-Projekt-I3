function loadModal(inst_name){
    // $('#edit_modal_anz').prop('checked', true); set checkbox true manually
    $.ajax({
        data: {
            eng: inst_name
        },
        type: 'POST',
        url: '/openModal'
    })
        .done(function (data){ //put data into modal
            let chosen_inst = data[0];
            $('#edit_mod_country').val(chosen_inst['country']);
            $('#edit_modal_eng').val(chosen_inst['eng']);
            $('#edit_modal_local').val(chosen_inst['local']);
            $('#edit_modal_adr').val(chosen_inst['adr']);
            $('#edit_modal_ws').val(chosen_inst['website']);
            $('#edit_modal_ntzn').val(chosen_inst['notes']);
            if (chosen_inst['display'] === 1) {
                $('#edit_modal_anz').prop('checked', true);
            }
            $('#edit_modal_ec').val(chosen_inst['ec']);
        });
}