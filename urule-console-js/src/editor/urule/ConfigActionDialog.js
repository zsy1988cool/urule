/**
 * @author GJ
 */
import {MsgBox} from 'flowdesigner';
import * as event from '../../components/componentEvent.js';

urule.ConfigActionDialog=function(parent){
	this.parent=parent;
	this.init();
};

urule.ConfigActionDialog.prototype.open=function(){
	const _this=this;
	MsgBox.showDialog('动作库配置',this.dialogContent,[
		{
			name:'添加',
			holdDialog:true,
			click:function(){
				event.eventEmitter.emit(event.OPEN_KNOWLEDGE_TREE_DIALOG,{
					project:window._project,
					fileType:'ActionLibrary',
					callback:function(file,version){
						let path='jcr:'+file;
						if(version!=='LATEST'){
							path+=':'+version;
						}
						const pos=window.actionLibraries.indexOf(path);
						if(pos!==-1){
							MsgBox.alert('动作库文件已存在');
							return;
						}
						_this.tbody.append(_this.newLibRow(path));
						window.actionLibraries.push(path);
						window.refreshActionLibraries();
						window._setDirty();
					}
				});
			}
		}
	]);
};

urule.ConfigActionDialog.prototype.init=function(){
	var self=this;
	const table=$(`<table class="table table-bordered">
		<thead><tr>
			<td>动作库文件</td><td style="width: 70px">操作</td>
		</tr></thead>
	</table>`);
	this.tbody=$(`<tbody></tbody>`);
	table.append(this.tbody);
	this.dialogContent=$('<div>');
	this.dialogContent.append(table);

	for(var i=0;i<window.actionLibraries.length;i++){
		const lib=window.actionLibraries[i];
		this.tbody.append(this.newLibRow(lib));
	}
};


urule.ConfigActionDialog.prototype.newLibRow=function(lib){
	const row=$(`<tr>
			<td>${lib}</td>
		</tr>`);
	const delCol=$(`<td></td>`),delButton=$(`<button type="button" class="btn btn-link">删除</button>`);
	delCol.append(delButton);
	delButton.click(function(){
		const pos=window.actionLibraries.indexOf(lib);
		window.actionLibraries.splice(pos,1);
		row.remove();
		window.refreshActionLibraries();
		window._setDirty();
	});
	row.append(delCol);
	return row;
};