// jQuery( document ).ready(function(){
//       jQuery("header#masthead").sticky({ topSpacing: 0 });
// });

 jQuery(document).ready(function(){
        jQuery('.roi-calculator-know-more').hide();
        jQuery('.provider_section').hide();
        jQuery('.health_plan_section').show();
        
        jQuery(document).on('change', 'input[name=organization_type]', function (e) {

            jQuery('.roi_calculation_result').hide();
            var organization_type = jQuery("input[name=organization_type]:checked").val();
            console.log(organization_type);
            if (organization_type == 'Provider') {
                jQuery('.provider_section').show();
                jQuery('.health_plan_section').hide();
                jQuery('select[name=number_of_prior_authorizations]').prop('required', false);
                jQuery('input[name=number_of_prior_authorizations_provider]').prop('required', true);
            } else if (organization_type == 'Health plan') {
                jQuery('.health_plan_section').show();
                jQuery('.provider_section').hide();
                jQuery('input[name=number_of_prior_authorizations_provider]').prop('required', false);
                jQuery('select[name=number_of_prior_authorizations]').prop('required', true);
            }
        });

        // handle extra questions 
        jQuery(document).on('change', 'input[name=ehr_emr_system_provider]', function (e) {
            var organization_type = jQuery("input[name=ehr_emr_system_provider]:checked").val();
            console.log(organization_type);
            if (organization_type == 'Other') {
                jQuery('#ehr_emr_system_epic_provider_others').show();
            }else{
                jQuery('#ehr_emr_system_epic_provider_others').hide();
            }
        });

        jQuery('#hc-check').change(function() {
            if (jQuery(this).is(':checked')) {
                jQuery('#procedure_types_others').show();
            } else {
                jQuery('#procedure_types_others').hide();
            }
        });
        jQuery('#prov-other').change(function() {
            if (jQuery(this).is(':checked')) {
                jQuery('#procedure_types_provider').show();
            } else {
                jQuery('#procedure_types_provider').hide();
            }
        });


        jQuery('#roi_calculation_form input[type=submit]').on('click', function(e){
            e.preventDefault();
            var organization_type = jQuery("input[name=organization_type]:checked").val();
            if (organization_type == 'Provider') {
                var pa = jQuery('input[name=number_of_prior_authorizations_provider]').val();
                var base = 10.95;
            } else if (organization_type == 'Health plan') {
                var pa = jQuery('select[name=number_of_prior_authorizations]').val();
                var base = 1.8*0.4*14.42;
            }
            if(pa != ''){
                var roi_output = pa*base;
                roi_output = roi_output.toLocaleString('en-US');
                jQuery('.roi_calculation_result .roi_output').html(roi_output);
                jQuery('.roi_calculation_result').show();
                jQuery('.roi-calculator-know-more').show();
                jQuery('#roi_calculation_form').hide();
            }else{
               jQuery('select#number_of_prior_authorizations').css('border', '2px solid red');
                jQuery('input#number_of_prior_authorizations_provider').css('border', '2px solid red');
            }
            return false;
        });

        jQuery('.calculate-another').on('click', function(e){
            e.preventDefault();

            jQuery('.roi_calculation_result').hide();
            jQuery('.roi-calculator-know-more').hide();
            jQuery('#roi_calculation_form').show();

        });
      });