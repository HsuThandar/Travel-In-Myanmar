// for select option
var Select_List_Data = {
    
    'places': { // name of associated select box
        
        // names match option values in controlling select box
        yangon: {
            text: ['Bogyoke Aung San Market', 'St. Mary’s Cathedral', 'Sule Pagoda', 'Taukkyan War Cemetry', 'Yangon Walls'],
            value: ['ygn1', 'ygn2', 'ygn3', 'ygn4', 'ygn5']
        },
        bagan: {
            text: ['Ananda Temple', 'Buu Pagoda', 'Dhammayangyi Temple', 'Shwezigon Pagoda','Thatbinnyu Pagoda'],
            value: ['bagan1', 'bagan2', 'bagan3', 'bagan4','bagan5']
        },
        inle: {
            // example without values
            text: ['Five Days Market', 'Lotus Weaving', 'Phaung Daw Oo Pagoda', 'Shwe Inn Daing','Trekking'],
            value: ['inle1', 'inle2', 'inle3', 'inle4','inle5']
        },
        madalay: {
            // example without values
            text: ['Kuthodaw Pagoda', 'Maha Myat Muni Pagoda', 'Mandalay Hill', 'Mandalay Royal Palace','U Bein Bridge'],
            value: ['mdy1', 'mdy2', 'mdy3', 'mdy4','mdy5']
        },
        hpaan: {
            text: ['Kan Thar Yar Lake', 'Zwe Ka Bin Mountain', 'Kyaut Ka Latt Pagoda', 'Kaw Ka Thaung Cave'] ,
            value: ['phaan1', 'phaan1', 'phaan1', 'phaan1']
        }
    
    }    
};

// removes all option elements in select box 
// removeGrp (optional) boolean to remove optgroups
function removeAllOptions(sel, removeGrp) {
    var len, groups, par;
    if (removeGrp) {
        groups = sel.getElementsByTagName('optgroup');
        len = groups.length;
        for (var i=len; i; i--) {
            sel.removeChild( groups[i-1] );
        }
    }
    
    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild( sel.options[i-1] );
    }
}

function appendDataToSelect(sel, obj) {
    var f = document.createDocumentFragment();
    var labels = [], group, opts;
    
    function addOptions(obj) {
        var f = document.createDocumentFragment();
        var o;
        
        for (var i=0, len=obj.text.length; i<len; i++) {
            o = document.createElement('option');
            o.appendChild( document.createTextNode( obj.text[i] ) );
            
            if ( obj.value ) {
                o.value = obj.value[i];
            }
            
            f.appendChild(o);
        }
        return f;
    }
    // console.log(obj.text);
    if ( obj.text ) {
        opts = addOptions(obj);
        f.appendChild(opts);
    } else {
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) {
                labels.push(prop);
            }
        }
        
        for (var i=0, len=labels.length; i<len; i++) {
            group = document.createElement('optgroup');
            group.label = labels[i];
            f.appendChild(group);
            opts = addOptions(obj[ labels[i] ] );
            group.appendChild(opts);
        }
    }
    sel.appendChild(f);
}
// anonymous function assigned to onchange event of controlling select box
document.forms['demoForm'].elements['city'].onchange = function(e) {
    // name of associated select box
    var relName = 'places';
    
    // reference to associated select box 
    var relList = this.form.elements[ relName ];
    
    // get data from object literal based on selection in controlling select box (this.value)
    var obj = Select_List_Data[ relName ][ this.value ];
    
    // remove current option elements
    removeAllOptions(relList, true);
    
    // call function to add optgroup/option elements
    // pass reference to associated select box and data for new options
    appendDataToSelect(relList, obj);
};


// populate associated select box as page loads
(function() { // immediate function to avoid globals
    
    var form = document.forms['demoForm'];
    
    // reference to controlling select box
    var sel = form.elements['city'];
    sel.selectedIndex = 0;
    
    // name of associated select box
    var relName = 'places';
    // reference to associated select box
    var rel = form.elements[ relName ];
    
    // get data for associated select box passing its name
    // and value of selected in controlling select box
    var data = Select_List_Data[ relName ][ sel.value ];
    
    // add options to associated select box
    appendDataToSelect(rel, data);
    
});