/**
 * Created by zkzc-mcy on 2017/10/25.
 */

UE.plugins['copyContent'] = function () {

    var me = this;
    me.commands['setAsTitle'] = {
        execCommand: function () {

            console.log('exec setTitle');

            var rng = me.selection.getRange();
            var content = rng.cloneContents();

            alert(content);
        }
    };

    me.commands['setAsAbstract'] = {
        execCommand: function () {

            console.log('exec setAsAbstract');

            var rng = me.selection.getRange();
            var content = rng.cloneContents();

            console.log(content);
        }
    };
};
