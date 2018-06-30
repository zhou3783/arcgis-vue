// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.24/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/WGLFeatureView","require exports ../../../../core/tsSupport/assignHelper ../../../../core/tsSupport/extendsHelper ../../../../core/promiseUtils ../../../../core/promiseUtils ../../../../core/libs/gl-matrix/mat4 ../../../../core/libs/gl-matrix/vec3 ../../../../geometry/Point ../../../../renderers/support/diffUtils ../Container ../StageGL ../../engine/webgl/TileData ./enums ./GeometryUtils ./rendererInfoUtils ./rendererInfoUtils ./TextureManager ./Utils ./visualVariablesUtils ./WGLPainter ./WGLRendererInfo ./WGLTile ./passes/WGLPaintPassHeatmap".split(" "),
function(K,L,w,x,y,z,k,l,A,n,B,C,p,q,D,r,E,F,t,u,m,v,G,H){function I(d){for(var c in d.diff){var a=d.diff[c];if("collection"===a.type){if(0!==a.changed.length||0!==a.added.length||0!==a.removed.length)return!0}else if("visualVariables"!==c&&"authoringInfo"!==c)return!0}return!1}return function(d){function c(a){var b=d.call(this)||this;b._container=new C;b._displayWidth=0;b._displayHeight=0;b._pointToCallbacks=new Map;b._highlightIDs=new Set;b._highlightOptionsUpToDate=!1;b.textureManager=new F;b._domContainer=
null;b._parentLayerView=a;b._tileCoordinateScale=l.create();b._orientationVec=l.create();b._displayScale=l.create();b._orientationVec.set([0,0,1]);b._defaultTransform=k.create();b._tileInfoView=a.tileInfoView;b.wglRendererInfo=new v(b);b.highlightOptions=a.view.highlightOptions;b._container.useContextVersion(a.view?a.view.renderContext:null);return b}x(c,d);Object.defineProperty(c.prototype,"highlightOptions",{get:function(){return this._highlightOptions},set:function(a){this._highlightOptions=a;
this._highlightOptionsUpToDate=!1},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"displayWidth",{get:function(){return this._displayWidth},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"displayHeight",{get:function(){return this._displayHeight},enumerable:!0,configurable:!0});c.prototype.initialize=function(a){this._tileInfoView=a;this.wglRendererInfo=new v(this);a=new m.WGLPainterOptions;this.wglRendererInfo.heatmapParameters&&a.registerPass(H.default,m.default.allGeometryPhases());
this._painterOptions=a};c.prototype.updateHeatmapParameters=function(a){this.wglRendererInfo.updateHeatmapParameters(a);this.requestRender()};c.prototype.hitTest=function(a,b){var g=this,c=[a,b];return y.create(function(a,b){g._pointToCallbacks.set(c,{resolve:a,reject:b});g.requestRender()},function(){g._pointToCallbacks.has(c)&&g._pointToCallbacks.delete(c)})};c.prototype.setHighlight=function(a){this._highlightIDs.clear();this.addHighlight(a)};c.prototype.setVisibility=function(a){for(var b=0,c=
this.children;b<c.length;b++)c[b].setVisibility(a)};c.prototype.addHighlight=function(a){for(var b=0;b<a.length;b++)this._highlightIDs.add(a[b]);this._buildHLList()};c.prototype.removeHighlight=function(a){for(var b=0;b<a.length;b++)this._highlightIDs.delete(a[b]);this._buildHLList()};c.prototype.addChild=function(a){a=d.prototype.addChild.call(this,a);this._buildHLList();return a};c.prototype.removeChild=function(a){a=d.prototype.removeChild.call(this,a);this._buildHLList();return a};c.prototype.prepareChildrenRenderParameters=
function(a){this.wglRendererInfo.updateVisualVariables(this._visualVariablesInfo.vvRanges,a.state);var b=this._tileInfoView.getClosestInfoForScale(a.state.scale).level;return w({},a,{rendererInfo:this.wglRendererInfo,requiredLevel:b,drawPhase:q.WGLDrawPhase.NONE})};c.prototype.renderChildren=function(a){var b=this,c=a.painter;c.bindTextureManager(this.textureManager);this.wglRendererInfo.updateVisualVariables(this._visualVariablesInfo.vvRanges,a.state);this.sortChildren(function(a,b){return a.key.level-
b.key.level});c.draw(a,this.children,m.default.allGeometryPhases(),this._painterOptions);0<this._highlightIDs.size&&c.highlight(a,this.children);0!==this._pointToCallbacks.size&&(this._pointToCallbacks.forEach(function(c,g){c.resolve(b._hitTest(a,g[0],g[1]))}),this._pointToCallbacks.clear())};c.prototype.attachChild=function(a,b){return a.attach(b)};c.prototype.detachChild=function(a,b){a.detach(b)};c.prototype.renderChild=function(a,b){a.doRender(b)};c.prototype.beforeRenderChildren=function(a,b){this._updateTilesTransform(a.state,
this._tileInfoView.getClosestInfoForScale(a.state.scale).level);this._updateHighlightOptions();this._container.opacity=this._domContainer.opacity};c.prototype._hitTest=function(a,b,c){var g=a.painter,e=this._tileInfoView.getClosestInfoForScale(a.state.scale).level,h=[0,0];a.state.toMap(h,[b,c]);b=a.state.clone();c=b.viewpoint.clone();c.targetGeometry=new A(h[0],h[1],a.state.spatialReference);b.viewpoint=c;b.size=[t.C_HITTEST_SEARCH_SIZE,t.C_HITTEST_SEARCH_SIZE];this._updateTilesTransform(b,e);g.update(b,
a.pixelRatio);return g.hitTest({context:a.context,painter:g,drawPhase:q.WGLDrawPhase.HITTEST,state:b,pixelRatio:a.pixelRatio,stationary:a.stationary,rendererInfo:this.wglRendererInfo,requiredLevel:e},this.children)};c.prototype._updateTilesTransform=function(a,b){var c=1/a.width,J=1/a.height,e=[0,0];this._calculateRelativeViewProjMat(this._tileInfoView.tileInfo.lods[b].resolution,a.resolution,a.rotation,this._tileInfoView.tileInfo.size[0],a.width,a.height,this._defaultTransform);for(var h=0,f=this.children;h<
f.length;h++){var d=f[h];a.toScreen(e,d.coords);e[1]=a.height-e[1];d.tileTransform.displayCoord[0]=2*e[0]*c-1;d.tileTransform.displayCoord[1]=2*e[1]*J-1;d.key.level===b?d.tileTransform.transform.set(this._defaultTransform):this._calculateRelativeViewProjMat(this._tileInfoView.tileInfo.lods[d.key.level].resolution,a.resolution,a.rotation,this._tileInfoView.tileInfo.size[0],a.width,a.height,d.tileTransform.transform)}};c.prototype._calculateRelativeViewProjMat=function(a,b,c,d,e,h,f){a/=b;this._tileCoordinateScale.set([a,
a,1]);if(e!==this._displayWidth||h!==this._displayHeight)this._displayScale.set([2/e,-2/h,1]),this._displayWidth=e,this._displayHeight=h;k.identity(f);k.scale(f,f,this._tileCoordinateScale);k.rotate(f,f,-c*D.C_DEG_TO_RAD,this._orientationVec);k.scale(f,f,this._displayScale);k.transpose(f,f)};c.prototype._updateHighlightOptions=function(){!this._highlightOptionsUpToDate&&this._setHighlightOptions(this._highlightOptions)&&(this._highlightOptionsUpToDate=!0)};c.prototype._setHighlightOptions=function(a){if(!this.parent)return!1;
var b=this.parent.glPainter;if(!b)return!1;var c=a.color.toRgba();c[0]/=255;c[1]/=255;c[2]/=255;var d=c.slice();c[3]*=a.fillOpacity;d[3]*=a.haloOpacity;b.setHighlightOptions({fillColor:c,outlineColor:d,outlineWidth:2,outerHaloWidth:.3,innerHaloWidth:.3,outlinePosition:0});return!0};c.prototype._buildHLList=function(){for(var a=0,b=this.children;a<b.length;a++)b[a].buildHLList(this._highlightIDs);this.requestRender()};c.prototype.highlight=function(a){var b=this;b.addHighlight(a);return{remove:function(){b.removeHighlight(a)}}};
c.prototype.install=function(a){a.addChild(this._container);this._container.addChild(this);this._domContainer=a};c.prototype.uninstall=function(a){a.removeChild(this._container);this._container.removeChild(this);this._domContainer=null};c.prototype.getMaterialItems=function(a){if(a&&0!==a.length){for(var b=[],c=0;c<a.length;c++){var d=a[c];b.push(this.textureManager.rasterizeItem(d.symbol,d.glyphIds))}return z.all(b).then(function(a){return a.map(function(a,b){return{id:b,mosaicItem:a}})})}};c.prototype.getProcessorConfiguration=
function(){return{type:"symbol",renderer:this._parentLayerView.layer.renderer.toJSON(),devicePixelRatio:window.devicePixelRatio||1,definitionExpression:this._parentLayerView.layer.definitionExpression,outFields:this._parentLayerView.layer.outFields,gdbVersion:this._parentLayerView.layer.gdbVersion,historicMoment:this._parentLayerView.layer.historicMoment&&this._parentLayerView.layer.historicMoment.getTime()}};c.prototype.acquireTile=function(a){var b=this,c=[0,0,0,0];this._tileInfoView.getTileBounds(c,
a);a=new G(a,c);a.once("attach",function(){b._parentLayerView.requestUpdate()});return a};c.prototype.releaseTile=function(a){this.removeChild(a);a.once("detach",function(){a.dispose()})};c.prototype.setTileVisuals=function(a,b,c){var d=null;b&&!c&&(d=p.deserialize(b));a.setData(d,null!=this._parentLayerView.layer.renderer.visualVariables,c);a.buildHLList(this._highlightIDs);this.addChild(a);this.requestRender()};c.prototype.patchTileVisuals=function(a,b){var c=b.addOrUpdate?p.deserialize(b.addOrUpdate):
null;a.patchData({remove:b.remove||[],addOrUpdate:c});a.buildHLList(this._highlightIDs);this.requestRender()};c.prototype.renderInit=function(){this._renderer=this._parentLayerView.layer.renderer;var a=this._parentLayerView.layer,a=r.getNormalizedRenderer(a.renderer,a.spatialReference,{fields:a.fields.map(function(a){return a.toJSON()})});this._visualVariablesInfo=u.convertVisualVariables(a.visualVariables);this.requestRender()};c.prototype.renderSwitchFrom=function(a){a=this._parentLayerView.layer.renderer;
var b=n.diff(this._renderer,a);if(b){if("complete"===b.type)return this.renderInit(),!0;if("partial"===b.type){if(I(b))return this.renderInit(),!0;if(b.diff.visualVariables){var b=this._parentLayerView.layer,b=r.getNormalizedRenderer(a,b.spatialReference,{fields:b.fields.map(function(a){return a.toJSON()})}),b=u.convertVisualVariables(b.visualVariables),c=b.vvRanges;if(n.diff(this._visualVariablesInfo.vvFields,b.vvFields))return this.renderInit(),!0;this._visualVariablesInfo.vvRanges=c;this._renderer=
a;this.requestRender();return!1}}}else return!1};c.prototype.supports=function(a){return E.isRendererWebGLCompatible(a)};return c}(B)});