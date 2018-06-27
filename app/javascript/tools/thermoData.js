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
        console.log("Adding metadata to current axes");
        console.log(thermoAxisMetadata);
        selectedAxes = wpd.tree.getActiveAxes();
        selectedAxes.thermoData = thermoAxisMetadata;
        wpd.popup.close('add-axis-thermodata-popup');
    },

    showAddAxisMetadata: function() {    
        console.log("Show a popup for adding metadata to an axis")     
        wpd.popup.show('add-axis-thermodata-popup');
    },
    
    addDatasetMetadata: function() {
        // TODO: enable multiple conditions        
        console.log("Execute adding dataset metadata to the output JSON");
        const conditionSelector = document.getElementById('add-thermodata-dataset-condition-type-selector');
        let cond_type = conditionSelector.value;

        datasetMetadata = {
            condition_type: cond_type,
        };

        // set the metadata for the specific condition type
        if (cond_type == "tieline") {
            datasetMetadata.phases = wpd.thermoData.datasetConditions.getTielinePhases();
            datasetMetadata.nullPhaseIndicies = []
        }
        // TODO: remove fixed-phase as an option and instead use checkboxes to enable null tieline phases.
        if (cond_type == "fixed-phase") {
            fixedPhase = document.getElementById('thermodata-condition-fixed-phase-input-fixed').value
            freePhase = document.getElementById('thermodata-condition-fixed-phase-input-free').value
            datasetMetadata.phases = [fixedPhase, freePhase]
            datasetMetadata.nullPhaseIndicies = [1]
        }
        
        console.log("Adding metadata to current dataset");
        console.log(datasetMetadata);
        selectedDataset = wpd.tree.getActiveDataset();
        selectedDataset.thermoData = datasetMetadata;
        wpd.popup.close('add-dataset-thermodata-popup');
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
            const numTielinePhasesSelector = document.getElementById('add-thermodata-condition-num-tielines-selector');  
            tielinePhases = new Array(Number(numTielinePhasesSelector.value));
            for (var i = 0; i < tielinePhases.length; i++) {
                tielinePhases[i] = document.getElementById('thermodata-condition-tieline-phase-input-'+(i+1)).value;
            }
            return tielinePhases
        }

    },


    
};