function ClusterIcon(e,t){e.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),this.cluster_=e,this.className_=e.getMarkerClusterer().getClusterClass(),this.styles_=t,this.center_=null,this.div_=null,this.sums_=null,this.visible_=!1,this.rendered_=!1,this.setMap(e.getMap())}function Cluster(e){this.markerClusterer_=e,this.map_=e.getMap(),this.gridSize_=e.getGridSize(),this.minClusterSize_=e.getMinimumClusterSize(),this.averageCenter_=e.getAverageCenter(),this.markers_=[],this.center_=null,this.bounds_=null,this.clusterIcon_=new ClusterIcon(this,e.getStyles())}function MarkerClusterer(e,t,r){this.extend(MarkerClusterer,google.maps.OverlayView),t=t||[],r=r||{},this.markers_=[],this.clusters_=[],this.listeners_=[],this.activeMap_=null,this.ready_=!1,this.gridSize_=r.gridSize||60,this.minClusterSize_=r.minimumClusterSize||2,this.clusterRenderer_=r.clusterRenderer||null,this.maxZoom_=r.maxZoom||null,this.minZoom_=r.minZoom||null,this.styles_=r.styles||[],this.title_=r.title||"",this.zoomOnClick_=!0,void 0!==r.zoomOnClick&&(this.zoomOnClick_=r.zoomOnClick),this.averageCenter_=!1,void 0!==r.averageCenter&&(this.averageCenter_=r.averageCenter),this.ignoreHidden_=!1,void 0!==r.ignoreHidden&&(this.ignoreHidden_=r.ignoreHidden),this.enableRetinaIcons_=!1,void 0!==r.enableRetinaIcons&&(this.enableRetinaIcons_=r.enableRetinaIcons),this.imagePath_=r.imagePath||MarkerClusterer.IMAGE_PATH,this.imageExtension_=r.imageExtension||MarkerClusterer.IMAGE_EXTENSION,this.imageSizes_=r.imageSizes||MarkerClusterer.IMAGE_SIZES,this.calculator_=r.calculator||MarkerClusterer.CALCULATOR,this.batchSize_=r.batchSize||MarkerClusterer.BATCH_SIZE,this.batchSizeIE_=r.batchSizeIE||MarkerClusterer.BATCH_SIZE_IE,this.clusterClass_=r.clusterClass||"cluster",-1!==navigator.userAgent.toLowerCase().indexOf("msie")&&(this.batchSize_=this.batchSizeIE_),this.setupStyles_(),this.addMarkers(t,!0),this.setMap(e)}ClusterIcon.prototype.onAdd=function(){var t,o,n=this,e=google.maps.version.split(".");e=parseInt(100*e[0],10)+parseInt(e[1],10),this.div_=document.createElement("div"),this.div_.className=this.className_,this.visible_&&this.show(),this.getPanes().overlayMouseTarget.appendChild(this.div_),this.boundsChangedListener_=google.maps.event.addListener(this.getMap(),"bounds_changed",function(){o=t}),google.maps.event.addDomListener(this.div_,"mousedown",function(){o=!(t=!0)}),332<=e&&google.maps.event.addDomListener(this.div_,"touchstart",function(e){e.stopPropagation()}),google.maps.event.addDomListener(this.div_,"click",function(e){if(t=!1,!o){var r,s,i=n.cluster_.getMarkerClusterer();google.maps.event.trigger(i,"click",n.cluster_),google.maps.event.trigger(i,"clusterclick",n.cluster_),i.getZoomOnClick()&&(s=i.getMaxZoom(),r=n.cluster_.getBounds(),i.getMap().fitBounds(r),setTimeout(function(){i.getMap().fitBounds(r),null!==s&&i.getMap().getZoom()>s&&i.getMap().setZoom(s+1);var e=i.getMap().getMapTypeId(),t=i.getMap().getZoom();(21<=t&&"roadmap"==e||20<=t&&"hybrid"==e)&&i.repaint()},100)),e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation()}}),google.maps.event.addDomListener(this.div_,"mouseover",function(){var e=n.cluster_.getMarkerClusterer();google.maps.event.trigger(e,"mouseover",n.cluster_)}),google.maps.event.addDomListener(this.div_,"mouseout",function(){var e=n.cluster_.getMarkerClusterer();google.maps.event.trigger(e,"mouseout",n.cluster_)})},ClusterIcon.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),google.maps.event.removeListener(this.boundsChangedListener_),google.maps.event.clearInstanceListeners(this.div_),this.div_.parentNode.removeChild(this.div_),this.div_=null,this.rendered_=!1)},ClusterIcon.prototype.draw=function(){if(this.visible_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.top=e.y+"px",this.div_.style.left=e.x+"px",this.div_.style.zIndex=google.maps.Marker.MAX_ZINDEX+1}},ClusterIcon.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},ClusterIcon.prototype.show=function(){if(this.div_&&!this.rendered_){var e=this.getPosFromLatLng_(this.center_);if(this.div_.style.cssText=this.createCss(e),null==this.cluster_.getMarkerClusterer().getClusterRenderer()){var t=this.backgroundPosition_.split(" "),r=parseInt(t[0].replace(/^\s+|\s+$/g,""),10),s=parseInt(t[1].replace(/^\s+|\s+$/g,""),10),i="";i="<img src='"+this.url_+"' style='position: absolute; top: "+-s+"px; left: "+-r+"px; ",this.cluster_.getMarkerClusterer().enableRetinaIcons_?i+="width: "+this.width_+"px; height: "+this.height_+"px;":i+="clip: rect("+s+"px, "+(r+this.width_)+"px, "+(s+this.height_)+"px, "+r+"px);",i+="'>",this.div_.innerHTML=i+"<div style='position: absolute;top: "+this.anchorText_[0]+"px;left: "+this.anchorText_[1]+"px;color: "+this.textColor_+";font-size: "+this.textSize_+"px;font-family: "+this.fontFamily_+";font-weight: "+this.fontWeight_+";font-style: "+this.fontStyle_+";text-decoration: "+this.textDecoration_+";text-align: center;width: "+this.width_+"px;line-height:"+this.height_+"px;'>"+this.sums_.text+"</div>"}else this.cluster_.getMarkerClusterer().getClusterRenderer().apply(this,[this.div_,this.cluster_,this.sums_.text]);this.rendered_=!0,void 0===this.sums_.title||""===this.sums_.title?this.div_.title=this.cluster_.getMarkerClusterer().getTitle():this.div_.title=this.sums_.title,this.div_.style.display=""}this.visible_=!0},ClusterIcon.prototype.useStyle=function(e){this.sums_=e;var t=Math.max(0,e.index-1);t=Math.min(this.styles_.length-1,t);var r=this.styles_[t];this.url_=r.url,this.height_=r.height,this.width_=r.width,this.anchorText_=r.anchorText||[0,0],this.anchorIcon_=r.anchorIcon||[parseInt(this.height_/2,10),parseInt(this.width_/2,10)],this.textColor_=r.textColor||"black",this.textSize_=r.textSize||11,this.textDecoration_=r.textDecoration||"none",this.fontWeight_=r.fontWeight||"bold",this.fontStyle_=r.fontStyle||"normal",this.fontFamily_=r.fontFamily||"Arial,sans-serif",this.backgroundPosition_=r.backgroundPosition||"0 0"},ClusterIcon.prototype.setCenter=function(e){this.center_=e},ClusterIcon.prototype.createCss=function(e){var t=[];return t.push("cursor: pointer;"),t.push("position: absolute; top: "+e.y+"px; left: "+e.x+"px;"),t.push("width: "+this.width_+"px; height: "+this.height_+"px;"),t.push("-webkit-user-select: none;"),t.push("-khtml-user-select: none;"),t.push("-moz-user-select: none;"),t.push("-o-user-select: none;"),t.push("user-select: none;"),t.join("")},ClusterIcon.prototype.getPosFromLatLng_=function(e){var t=this.getProjection().fromLatLngToDivPixel(e);return t.x-=this.anchorIcon_[1],t.y-=this.anchorIcon_[0],t.x=parseInt(t.x,10),t.y=parseInt(t.y,10),t},Cluster.prototype.getSize=function(){return this.markers_.length},Cluster.prototype.getMarkers=function(){return this.markers_},Cluster.prototype.getCenter=function(){return this.center_},Cluster.prototype.getMap=function(){return this.map_},Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_},Cluster.prototype.getBounds=function(){var e,t=new google.maps.LatLngBounds(this.center_,this.center_),r=this.getMarkers();for(e=0;e<r.length;e++)t.extend(r[e].getPosition());return t},Cluster.prototype.remove=function(){this.clusterIcon_.setMap(null),this.markers_=[],delete this.markers_},Cluster.prototype.addMarker=function(e){var t,r,s,i;if(this.isMarkerAlreadyAdded_(e))return!1;if(this.center_){if(this.averageCenter_){var o=this.markers_.length+1,n=(this.center_.lat()*(o-1)+e.getPosition().lat())/o,a=(this.center_.lng()*(o-1)+e.getPosition().lng())/o;this.center_=new google.maps.LatLng(n,a),this.calculateBounds_()}}else this.center_=e.getPosition(),this.calculateBounds_();if(e.isAdded=!0,this.markers_.push(e),r=this.markers_.length,s=this.markerClusterer_.getMaxZoom(),i=this.markerClusterer_.getMinZoom(),null!==s&&this.map_.getZoom()>s)e.getMap()!==this.map_&&e.setMap(this.map_);else if(null!==i&&this.map_.getZoom()<i)e.getMap()!==this.map_&&e.setMap(this.map_);else if(r<this.minClusterSize_)e.getMap()!==this.map_&&e.setMap(this.map_);else if(r===this.minClusterSize_)for(t=0;t<r;t++)this.markers_[t].setMap(null);else e.setMap(null);return this.updateIcon_(),!0},Cluster.prototype.isMarkerInClusterBounds=function(e){return this.bounds_.contains(e.getPosition())},Cluster.prototype.calculateBounds_=function(){var e=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(e)},Cluster.prototype.updateIcon_=function(){var e=this.markers_.length,t=this.markerClusterer_.getMaxZoom(),r=this.markerClusterer_.getMinZoom();if(null!==t&&this.map_.getZoom()>t)this.clusterIcon_.hide();else if(null!==r&&this.map_.getZoom()<r)this.clusterIcon_.hide();else if(e<this.minClusterSize_)this.clusterIcon_.hide();else{var s=this.markerClusterer_.getStyles().length,i=this.markerClusterer_.getCalculator()(this.markers_,s);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.useStyle(i),this.clusterIcon_.show()}},Cluster.prototype.isMarkerAlreadyAdded_=function(e){var t;if(this.markers_.indexOf)return-1!==this.markers_.indexOf(e);for(t=0;t<this.markers_.length;t++)if(e===this.markers_[t])return!0;return!1},MarkerClusterer.prototype.onAdd=function(){var e=this;this.activeMap_=this.getMap(),this.ready_=!0,this.repaint(),this.prevZoom_=this.getMap().getZoom(),this.listeners_=[google.maps.event.addListener(this.getMap(),"zoom_changed",function(){var e=this.getMap().getZoom(),t=this.getMap().minZoom||0,r=Math.min(this.getMap().maxZoom||100,this.getMap().mapTypes[this.getMap().getMapTypeId()].maxZoom);e=Math.min(Math.max(e,t),r),this.prevZoom_!=e&&(this.prevZoom_=e,this.resetViewport_(!1))}.bind(this)),google.maps.event.addListener(this.getMap(),"idle",function(){e.redraw_()})]},MarkerClusterer.prototype.onRemove=function(){var e;for(e=0;e<this.markers_.length;e++)this.markers_[e].getMap()!==this.activeMap_&&this.markers_[e].setMap(this.activeMap_);for(e=0;e<this.clusters_.length;e++)this.clusters_[e].remove();for(this.clusters_=[],e=0;e<this.listeners_.length;e++)google.maps.event.removeListener(this.listeners_[e]);this.listeners_=[],this.activeMap_=null,this.ready_=!1},MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){var e,t;if(!(0<this.styles_.length))for(e=0;e<this.imageSizes_.length;e++)t=this.imageSizes_[e],this.styles_.push({url:this.imagePath_+(e+1)+"."+this.imageExtension_,height:t,width:t})},MarkerClusterer.prototype.fitMapToMarkers=function(){var e,t=this.getMarkers(),r=new google.maps.LatLngBounds;for(e=0;e<t.length;e++)!t[e].getVisible()&&this.getIgnoreHidden()||r.extend(t[e].getPosition());this.getMap().fitBounds(r)},MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_},MarkerClusterer.prototype.setGridSize=function(e){this.gridSize_=e},MarkerClusterer.prototype.getMinimumClusterSize=function(){return this.minClusterSize_},MarkerClusterer.prototype.setMinimumClusterSize=function(e){this.minClusterSize_=e},MarkerClusterer.prototype.getClusterRenderer=function(){return this.clusterRenderer_},MarkerClusterer.prototype.setClusterRenderer=function(e){this.clusterRenderer_=e},MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_},MarkerClusterer.prototype.setMaxZoom=function(e){this.maxZoom_=e},MarkerClusterer.prototype.getMinZoom=function(){return this.minZoom_},MarkerClusterer.prototype.setMinZoom=function(e){this.minZoom_=e},MarkerClusterer.prototype.getStyles=function(){return this.styles_},MarkerClusterer.prototype.setStyles=function(e){this.styles_=e},MarkerClusterer.prototype.getTitle=function(){return this.title_},MarkerClusterer.prototype.setTitle=function(e){this.title_=e},MarkerClusterer.prototype.getZoomOnClick=function(){return this.zoomOnClick_},MarkerClusterer.prototype.setZoomOnClick=function(e){this.zoomOnClick_=e},MarkerClusterer.prototype.getAverageCenter=function(){return this.averageCenter_},MarkerClusterer.prototype.setAverageCenter=function(e){this.averageCenter_=e},MarkerClusterer.prototype.getIgnoreHidden=function(){return this.ignoreHidden_},MarkerClusterer.prototype.setIgnoreHidden=function(e){this.ignoreHidden_=e},MarkerClusterer.prototype.getEnableRetinaIcons=function(){return this.enableRetinaIcons_},MarkerClusterer.prototype.setEnableRetinaIcons=function(e){this.enableRetinaIcons_=e},MarkerClusterer.prototype.getImageExtension=function(){return this.imageExtension_},MarkerClusterer.prototype.setImageExtension=function(e){this.imageExtension_=e},MarkerClusterer.prototype.getImagePath=function(){return this.imagePath_},MarkerClusterer.prototype.setImagePath=function(e){this.imagePath_=e},MarkerClusterer.prototype.getImageSizes=function(){return this.imageSizes_},MarkerClusterer.prototype.setImageSizes=function(e){this.imageSizes_=e},MarkerClusterer.prototype.getCalculator=function(){return this.calculator_},MarkerClusterer.prototype.setCalculator=function(e){this.calculator_=e},MarkerClusterer.prototype.getBatchSizeIE=function(){return this.batchSizeIE_},MarkerClusterer.prototype.setBatchSizeIE=function(e){this.batchSizeIE_=e},MarkerClusterer.prototype.getClusterClass=function(){return this.clusterClass_},MarkerClusterer.prototype.setClusterClass=function(e){this.clusterClass_=e},MarkerClusterer.prototype.getMarkers=function(){return this.markers_},MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length},MarkerClusterer.prototype.getClusters=function(){return this.clusters_},MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length},MarkerClusterer.prototype.addMarker=function(e,t){this.pushMarkerTo_(e),t||this.redraw_()},MarkerClusterer.prototype.addMarkers=function(e,t){var r;for(r in e)e.hasOwnProperty(r)&&this.pushMarkerTo_(e[r]);t||this.redraw_()},MarkerClusterer.prototype.pushMarkerTo_=function(e){if(e.getDraggable()){var t=this;google.maps.event.addListener(e,"dragend",function(){t.ready_&&(this.isAdded=!1,t.repaint())})}e.isAdded=!1,this.markers_.push(e)},MarkerClusterer.prototype.removeMarker=function(e,t){var r=this.removeMarker_(e);return!t&&r&&this.repaint(),r},MarkerClusterer.prototype.removeMarkers=function(e,t){var r,s,i=!1;for(r=0;r<e.length;r++)s=this.removeMarker_(e[r]),i=i||s;return!t&&i&&this.repaint(),i},MarkerClusterer.prototype.removeMarker_=function(e){var t,r=-1;if(this.markers_.indexOf)r=this.markers_.indexOf(e);else for(t=0;t<this.markers_.length;t++)if(e===this.markers_[t]){r=t;break}return-1!==r&&(e.setMap(null),this.markers_.splice(r,1),!0)},MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport_(!0),this.markers_=[]},MarkerClusterer.prototype.repaint=function(){var t=this.clusters_.slice();this.clusters_=[],this.resetViewport_(!1),this.redraw_(),setTimeout(function(){var e;for(e=0;e<t.length;e++)t[e].remove()},0)},MarkerClusterer.prototype.getExtendedBounds=function(e){var t=this.getProjection(),r=new google.maps.LatLng(e.getNorthEast().lat(),e.getNorthEast().lng()),s=new google.maps.LatLng(e.getSouthWest().lat(),e.getSouthWest().lng()),i=t.fromLatLngToDivPixel(r);i.x+=this.gridSize_,i.y-=this.gridSize_;var o=t.fromLatLngToDivPixel(s);o.x-=this.gridSize_,o.y+=this.gridSize_;var n=t.fromDivPixelToLatLng(i),a=t.fromDivPixelToLatLng(o);return e.extend(n),e.extend(a),e},MarkerClusterer.prototype.redraw_=function(){this.createClusters_(0)},MarkerClusterer.prototype.resetViewport_=function(e){var t,r;for(t=0;t<this.clusters_.length;t++)this.clusters_[t].remove();for(this.clusters_=[],t=0;t<this.markers_.length;t++)(r=this.markers_[t]).isAdded=!1,e&&r.setMap(null)},MarkerClusterer.prototype.distanceBetweenPoints_=function(e,t){var r=(t.lat()-e.lat())*Math.PI/180,s=(t.lng()-e.lng())*Math.PI/180,i=Math.sin(r/2)*Math.sin(r/2)+Math.cos(e.lat()*Math.PI/180)*Math.cos(t.lat()*Math.PI/180)*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)))},MarkerClusterer.prototype.isMarkerInBounds_=function(e,t){return t.contains(e.getPosition())},MarkerClusterer.prototype.addToClosestCluster_=function(e){var t,r,s,i,o=4e4,n=null;for(t=0;t<this.clusters_.length;t++)(i=(s=this.clusters_[t]).getCenter())&&(r=this.distanceBetweenPoints_(i,e.getPosition()))<o&&(o=r,n=s);n&&n.isMarkerInClusterBounds(e)?n.addMarker(e):((s=new Cluster(this)).addMarker(e),this.clusters_.push(s))},MarkerClusterer.prototype.createClusters_=function(e){var t,r,s,i=this;if(this.ready_){0===e&&(google.maps.event.trigger(this,"clusteringbegin",this),void 0!==this.timerRefStatic&&(clearTimeout(this.timerRefStatic),delete this.timerRefStatic)),s=3<this.getMap().getZoom()?new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),this.getMap().getBounds().getNorthEast()):new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472,-178.48388434375),new google.maps.LatLng(-85.08136444384544,178.00048865625));var o=this.getExtendedBounds(s),n=Math.min(e+this.batchSize_,this.markers_.length);for(t=e;t<n;t++)!(r=this.markers_[t]).isAdded&&this.isMarkerInBounds_(r,o)&&(!this.ignoreHidden_||this.ignoreHidden_&&r.getVisible())&&this.addToClosestCluster_(r);n<this.markers_.length?this.timerRefStatic=setTimeout(function(){i.createClusters_(n)},0):(delete this.timerRefStatic,google.maps.event.trigger(this,"clusteringend",this))}},MarkerClusterer.prototype.extend=function(e,t){return function(e){var t;for(t in e.prototype)this.prototype[t]=e.prototype[t];return this}.apply(e,[t])},MarkerClusterer.CALCULATOR=function(e,t){for(var r=0,s=e.length.toString(),i=s;0!==i;)i=parseInt(i/10,10),r++;return{text:s,index:r=Math.min(r,t),title:""}},MarkerClusterer.BATCH_SIZE=2e3,MarkerClusterer.BATCH_SIZE_IE=500,MarkerClusterer.IMAGE_PATH="https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m",MarkerClusterer.IMAGE_EXTENSION="png",MarkerClusterer.IMAGE_SIZES=[53,56,66,78,90];