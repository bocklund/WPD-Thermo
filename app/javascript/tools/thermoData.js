var wpd = wpd || {};

wpd.thermoData = {
    addAxisMetadata: function() {        
        console.log("Execute adding metadata to the output JSON");
        const componentsInput = document.getElementById('add-thermodata-components-input');
        const xInput = document.getElementById('thermodata-x-axis-type-input');
        const yInput = document.getElementById('thermodata-y-axis-type-input');
        thermoAxisMetadata = {
            components: componentsInput.value,
            x: xInput.value,
            y: yInput.value
        };
        console.log(thermoAxisMetadata);
        wpd.popup.close('add-axis-thermodata-popup');
    },

    showAddAxisMetadata: function() {    
        console.log("Show a popup for adding metadata to an axis")     
        wpd.popup.show('add-axis-thermodata-popup');
    },
    
    addDatasetMetadata: function() {        
        console.log("Execute adding dataset metadata to the output JSON");
        const conditionSelector = document.getElementById('add-thermodata-dataset-condition-type-selector');
        let cond_type = conditionSelector.value;

        datasetMetadata = {
            condition_type: cond_type,
        };

        if (cond_type == "tieline") {
            
            
            datasetMetadata
        }

        
        console.log(datasetMetadata);
        wpd.popup.close('add-thermodata-popup');
    },

    showAddDatasetMetadata: function() {    
        console.log("Show a popup for adding metadata to a dataset");  
        wpd.popup.show('add-dataset-thermodata-popup');
    },

    datasetConditions: {
        hideAllConditionInputs: function() {
            // Hide all condition inputs to reset the condition
            const conditionSelector = document.getElementById('add-thermodata-dataset-condition-type-selector');
            for (var i = 0; i < conditionSelector.options.length; i++) {
                let el = document.getElementById('thermodata-dataset-condition-'+conditionSelector.options[i].value);
                el.hidden = true;
            }
        },
        
        showSelectedConditionInputs: function() {
            // Show the right input for the dataset condition that is selected
            wpd.thermoData.datasetConditions.hideAllConditionInputs();
            const conditionSelector = document.getElementById('add-thermodata-dataset-condition-type-selector');
            let elementToShow = document.getElementById('thermodata-dataset-condition-'+conditionSelector.value)
            elementToShow.hidden = false
            console.log("Updating the right condition view to show "+conditionSelector.value);
        },

        showTielineFields: function() {
            // Show the number of tieline fields that corresponds to the number of selected tielines
            const numTielinePhasesSelector = document.getElementById('add-thermodata-condition-num-tielines-selector')
            
            for (var i = 0; i < numTielinePhasesSelector.value; i++) {
                let el = document.getElementById('thermodata-condition-tieline-phase-'+(i+1));
                el.hidden = false;
            }
            for (var i = Number(numTielinePhasesSelector.value); i < numTielinePhasesSelector.options.length + 1; i++) {
                let el = document.getElementById('thermodata-condition-tieline-phase-'+(i+1));
                el.hidden = true;
            }
        },

        getTielinePhases: function() {

        }

    },


    
};