function ClusterIcon(t,e){t.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),this.cluster_=t,this.className_=t.getMarkerClusterer().getClusterClass(),this.styles_=e,this.center_=null,this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(t.getMap())}function Cluster(t){this.markerClusterer_=t,this.map_=t.getMap(),this.gridSize_=t.getGridSize(),this.minClusterSize_=t.getMinimumClusterSize(),this.averageCenter_=t.getAverageCenter(),this.markers_=[],this.center_=null,this.bounds_=null,this.clusterIcon_=new ClusterIcon(this,t.getStyles())}function MarkerClusterer(t,e,r){this.extend(MarkerClusterer,google.maps.OverlayView),e=e||[],r=r||{},this.markers_=[],this.clusters_=[],this.listeners_=[],this.activeMap_=null,this.ready_=!1,this.gridSize_=r.gridSize||60,this.minClusterSize_=r.minimumClusterSize||2,this.maxZoom_=r.maxZoom||null,this.minZoom_=r.minZoom||null,this.styles_=r.styles||[],this.title_=r.title||"",this.zoomOnClick_=!0,void 0!==r.zoomOnClick&&(this.zoomOnClick_=r.zoomOnClick),this.averageCenter_=!1,void 0!==r.averageCenter&&(this.averageCenter_=r.averageCenter),this.ignoreHidden_=!1,void 0!==r.ignoreHidden&&(this.ignoreHidden_=r.ignoreHidden),this.enableRetinaIcons_=!1,void 0!==r.enableRetinaIcons&&(this.enableRetinaIcons_=r.enableRetinaIcons),this.imagePath_=r.imagePath||MarkerClusterer.IMAGE_PATH,this.imageExtension_=r.imageExtension||MarkerClusterer.IMAGE_EXTENSION,this.imageSizes_=r.imageSizes||MarkerClusterer.IMAGE_SIZES,this.calculator_=r.calculator||MarkerClusterer.CALCULATOR,this.batchSize_=r.batchSize||MarkerClusterer.BATCH_SIZE,this.batchSizeIE_=r.batchSizeIE||MarkerClusterer.BATCH_SIZE_IE,this.clusterClass_=r.clusterClass||"cluster",-1!==navigator.userAgent.toLowerCase().indexOf("msie")&&(this.batchSize_=this.batchSizeIE_),this.setupStyles_(),this.addMarkers(e,!0),this.setMap(t)}ClusterIcon.prototype.onAdd=function(){var e,o,n=this,t=google.maps.version.split(".");t=parseInt(100*t[0],10)+parseInt(t[1],10),this.div_=document.createElement("div"),this.div_.className=this.className_,this.visible_&&this.show(),this.getPanes().overlayMouseTarget.appendChild(this.div_),this.boundsChangedListener_=google.maps.event.addListener(this.getMap(),"bounds_changed",function(){o=e}),google.maps.event.addDomListener(this.div_,"mousedown",function(){o=!(e=!0)}),332<=t&&google.maps.event.addDomListener(this.div_,"touchstart",function(t){t.stopPropagation()}),google.maps.event.addDomListener(this.div_,"click",function(t){if(e=!1,!o){var r,s,i=n.cluster_.getMarkerClusterer();google.maps.event.trigger(i,"click",n.cluster_),google.maps.event.trigger(i,"clusterclick",n.cluster_),i.getZoomOnClick()&&(s=i.getMaxZoom(),r=n.cluster_.getBounds(),i.getMap().fitBounds(r),setTimeout(function(){i.getMap().fitBounds(r),null!==s&&i.getMap().getZoom()>s&&i.getMap().setZoom(s+1);var t=i.getMap().getMapTypeId(),e=i.getMap().getZoom();(21<=e&&"roadmap"==t||20<=e&&"hybrid"==t)&&i.repaint()},100)),t.cancelBubble=!0,t.stopPropagation&&t.stopPropagation()}}),google.maps.event.addDomListener(this.div_,"mouseover",function(){var t=n.cluster_.getMarkerClusterer();google.maps.event.trigger(t,"mouseover",n.cluster_)}),google.maps.event.addDomListener(this.div_,"mouseout",function(){var t=n.cluster_.getMarkerClusterer();google.maps.event.trigger(t,"mouseout",n.cluster_)})},ClusterIcon.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),google.maps.event.removeListener(this.boundsChangedListener_),google.maps.event.clearInstanceListeners(this.div_),this.div_.parentNode.removeChild(this.div_),this.div_=null)},ClusterIcon.prototype.draw=function(){if(this.visible_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.top=t.y+"px",this.div_.style.left=t.x+"px",this.div_.style.zIndex=google.maps.Marker.MAX_ZINDEX+1}},ClusterIcon.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},ClusterIcon.prototype.show=function(){if(this.div_){var t="",e=this.backgroundPosition_.split(" "),r=parseInt(e[0].replace(/^\s+|\s+$/g,""),10),s=parseInt(e[1].replace(/^\s+|\s+$/g,""),10),i=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(i),t="<img src='"+this.url_+"' style='position: absolute; top: "+s+"px; left: "+r+"px; ",this.cluster_.getMarkerClusterer().enableRetinaIcons_?t+="width: "+this.width_+"px; height: "+this.height_+"px;":t+="clip: rect("+-1*s+"px, "+(-1*r+this.width_)+"px, "+(-1*s+this.height_)+"px, "+-1*r+"px);",t+="'>",this.div_.innerHTML=t+"<div style='position: absolute;top: "+this.anchorText_[0]+"px;left: "+this.anchorText_[1]+"px;color: "+this.textColor_+";font-size: "+this.textSize_+"px;font-family: "+this.fontFamily_+";font-weight: "+this.fontWeight_+";font-style: "+this.fontStyle_+";text-decoration: "+this.textDecoration_+";text-align: center;width: "+this.width_+"px;line-height:"+this.height_+"px;'>"+this.sums_.text+"</div>",void 0===this.sums_.title||""===this.sums_.title?this.div_.title=this.cluster_.getMarkerClusterer().getTitle():this.div_.title=this.sums_.title,this.div_.style.display=""}this.visible_=!0},ClusterIcon.prototype.useStyle=function(t){this.sums_=t;var e=Math.max(0,t.index-1);e=Math.min(this.styles_.length-1,e);var r=this.styles_[e];this.url_=r.url,this.height_=r.height,this.width_=r.width,this.anchorText_=r.anchorText||[0,0],this.anchorIcon_=r.anchorIcon||[parseInt(this.height_/2,10),parseInt(this.width_/2,10)],this.textColor_=r.textColor||"black",this.textSize_=r.textSize||11,this.textDecoration_=r.textDecoration||"none",this.fontWeight_=r.fontWeight||"bold",this.fontStyle_=r.fontStyle||"normal",this.fontFamily_=r.fontFamily||"Arial,sans-serif",this.backgroundPosition_=r.backgroundPosition||"0 0"},ClusterIcon.prototype.setCenter=function(t){this.center_=t},ClusterIcon.prototype.createCss=function(t){var e=[];return e.push("cursor: pointer;"),e.push("position: absolute; top: "+t.y+"px; left: "+t.x+"px;"),e.push("width: "+this.width_+"px; height: "+this.height_+"px;"),e.push("-webkit-user-select: none;"),e.push("-khtml-user-select: none;"),e.push("-moz-user-select: none;"),e.push("-o-user-select: none;"),e.push("user-select: none;"),e.join("")},ClusterIcon.prototype.getPosFromLatLng_=function(t){var e=this.getProjection().fromLatLngToDivPixel(t);return e.x-=this.anchorIcon_[1],e.y-=this.anchorIcon_[0],e.x=parseInt(e.x,10),e.y=parseInt(e.y,10),e},Cluster.prototype.getSize=function(){return this.markers_.length},Cluster.prototype.getMarkers=function(){return this.markers_},Cluster.prototype.getCenter=function(){return this.center_},Cluster.prototype.getMap=function(){return this.map_},Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_},Cluster.prototype.getBounds=function(){var t,e=new google.maps.LatLngBounds(this.center_,this.center_),r=this.getMarkers();for(t=0;t<r.length;t++)e.extend(r[t].getPosition());return e},Cluster.prototype.remove=function(){this.clusterIcon_.setMap(null),this.markers_=[],delete this.markers_},Cluster.prototype.addMarker=function(t){var e,r,s,i;if(this.isMarkerAlreadyAdded_(t))return!1;if(this.center_){if(this.averageCenter_){var o=this.markers_.length+1,n=(this.center_.lat()*(o-1)+t.getPosition().lat())/o,a=(this.center_.lng()*(o-1)+t.getPosition().lng())/o;this.center_=new google.maps.LatLng(n,a),this.calculateBounds_()}}else this.center_=t.getPosition(),this.calculateBounds_();if(t.isAdded=!0,this.markers_.push(t),r=this.markers_.length,s=this.markerClusterer_.getMaxZoom(),i=this.markerClusterer_.getMinZoom(),null!==s&&this.map_.getZoom()>s)t.getMap()!==this.map_&&t.setMap(this.map_);else if(null!==i&&this.map_.getZoom()<i)t.getMap()!==this.map_&&t.setMap(this.map_);else if(r<this.minClusterSize_)t.getMap()!==this.map_&&t.setMap(this.map_);else if(r===this.minClusterSize_)for(e=0;e<r;e++)this.markers_[e].setMap(null);else t.setMap(null);return this.updateIcon_(),!0},Cluster.prototype.isMarkerInClusterBounds=function(t){return this.bounds_.contains(t.getPosition())},Cluster.prototype.calculateBounds_=function(){var t=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(t)},Cluster.prototype.updateIcon_=function(){var t=this.markers_.length,e=this.markerClusterer_.getMaxZoom(),r=this.markerClusterer_.getMinZoom();if(null!==e&&this.map_.getZoom()>e)this.clusterIcon_.hide();else if(null!==r&&this.map_.getZoom()<r)this.clusterIcon_.hide();else if(t<this.minClusterSize_)this.clusterIcon_.hide();else{var s=this.markerClusterer_.getStyles().length,i=this.markerClusterer_.getCalculator()(this.markers_,s);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.useStyle(i),this.clusterIcon_.show()}},Cluster.prototype.isMarkerAlreadyAdded_=function(t){var e;if(this.markers_.indexOf)return-1!==this.markers_.indexOf(t);for(e=0;e<this.markers_.length;e++)if(t===this.markers_[e])return!0;return!1},MarkerClusterer.prototype.onAdd=function(){var t=this;this.activeMap_=this.getMap(),this.ready_=!0,this.repaint(),this.prevZoom_=this.getMap().getZoom(),this.listeners_=[google.maps.event.addListener(this.getMap(),"zoom_changed",function(){var t=this.getMap().getZoom(),e=this.getMap().minZoom||0,r=Math.min(this.getMap().maxZoom||100,this.getMap().mapTypes[this.getMap().getMapTypeId()].maxZoom);t=Math.min(Math.max(t,e),r),this.prevZoom_!=t&&(this.prevZoom_=t,this.resetViewport_(!1))}.bind(this)),google.maps.event.addListener(this.getMap(),"idle",function(){t.redraw_()})]},MarkerClusterer.prototype.onRemove=function(){var t;for(t=0;t<this.markers_.length;t++)this.markers_[t].getMap()!==this.activeMap_&&this.markers_[t].setMap(this.activeMap_);for(t=0;t<this.clusters_.length;t++)this.clusters_[t].remove();for(this.clusters_=[],t=0;t<this.listeners_.length;t++)google.maps.event.removeListener(this.listeners_[t]);this.listeners_=[],this.activeMap_=null,this.ready_=!1},MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){var t,e;if(!(0<this.styles_.length))for(t=0;t<this.imageSizes_.length;t++)e=this.imageSizes_[t],this.styles_.push({url:this.imagePath_+(t+1)+"."+this.imageExtension_,height:e,width:e})},MarkerClusterer.prototype.fitMapToMarkers=function(){var t,e=this.getMarkers(),r=new google.maps.LatLngBounds;for(t=0;t<e.length;t++)!e[t].getVisible()&&this.getIgnoreHidden()||r.extend(e[t].getPosition());this.getMap().fitBounds(r)},MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_},MarkerClusterer.prototype.setGridSize=function(t){this.gridSize_=t},MarkerClusterer.prototype.getMinimumClusterSize=function(){return this.minClusterSize_},MarkerClusterer.prototype.setMinimumClusterSize=function(t){this.minClusterSize_=t},MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_},MarkerClusterer.prototype.setMaxZoom=function(t){this.maxZoom_=t},MarkerClusterer.prototype.getMinZoom=function(){return this.minZoom_},MarkerClusterer.prototype.setMinZoom=function(t){this.minZoom_=t},MarkerClusterer.prototype.getStyles=function(){return this.styles_},MarkerClusterer.prototype.setStyles=function(t){this.styles_=t},MarkerClusterer.prototype.getTitle=function(){return this.title_},MarkerClusterer.prototype.setTitle=function(t){this.title_=t},MarkerClusterer.prototype.getZoomOnClick=function(){return this.zoomOnClick_},MarkerClusterer.prototype.setZoomOnClick=function(t){this.zoomOnClick_=t},MarkerClusterer.prototype.getAverageCenter=function(){return this.averageCenter_},MarkerClusterer.prototype.setAverageCenter=function(t){this.averageCenter_=t},MarkerClusterer.prototype.getIgnoreHidden=function(){return this.ignoreHidden_},MarkerClusterer.prototype.setIgnoreHidden=function(t){this.ignoreHidden_=t},MarkerClusterer.prototype.getEnableRetinaIcons=function(){return this.enableRetinaIcons_},MarkerClusterer.prototype.setEnableRetinaIcons=function(t){this.enableRetinaIcons_=t},MarkerClusterer.prototype.getImageExtension=function(){return this.imageExtension_},MarkerClusterer.prototype.setImageExtension=function(t){this.imageExtension_=t},MarkerClusterer.prototype.getImagePath=function(){return this.imagePath_},MarkerClusterer.prototype.setImagePath=function(t){this.imagePath_=t},MarkerClusterer.prototype.getImageSizes=function(){return this.imageSizes_},MarkerClusterer.prototype.setImageSizes=function(t){this.imageSizes_=t},MarkerClusterer.prototype.getCalculator=function(){return this.calculator_},MarkerClusterer.prototype.setCalculator=function(t){this.calculator_=t},MarkerClusterer.prototype.getBatchSizeIE=function(){return this.batchSizeIE_},MarkerClusterer.prototype.setBatchSizeIE=function(t){this.batchSizeIE_=t},MarkerClusterer.prototype.getClusterClass=function(){return this.clusterClass_},MarkerClusterer.prototype.setClusterClass=function(t){this.clusterClass_=t},MarkerClusterer.prototype.getMarkers=function(){return this.markers_},MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length},MarkerClusterer.prototype.getClusters=function(){return this.clusters_},MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length},MarkerClusterer.prototype.addMarker=function(t,e){this.pushMarkerTo_(t),e||this.redraw_()},MarkerClusterer.prototype.addMarkers=function(t,e){var r;for(r in t)t.hasOwnProperty(r)&&this.pushMarkerTo_(t[r]);e||this.redraw_()},MarkerClusterer.prototype.pushMarkerTo_=function(t){if(t.getDraggable()){var e=this;google.maps.event.addListener(t,"dragend",function(){e.ready_&&(this.isAdded=!1,e.repaint())})}t.isAdded=!1,this.markers_.push(t)},MarkerClusterer.prototype.removeMarker=function(t,e){var r=this.removeMarker_(t);return!e&&r&&this.repaint(),r},MarkerClusterer.prototype.removeMarkers=function(t,e){var r,s,i=!1;for(r=0;r<t.length;r++)s=this.removeMarker_(t[r]),i=i||s;return!e&&i&&this.repaint(),i},MarkerClusterer.prototype.removeMarker_=function(t){var e,r=-1;if(this.markers_.indexOf)r=this.markers_.indexOf(t);else for(e=0;e<this.markers_.length;e++)if(t===this.markers_[e]){r=e;break}return-1!==r&&(t.setMap(null),this.markers_.splice(r,1),!0)},MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport_(!0),this.markers_=[]},MarkerClusterer.prototype.repaint=function(){var e=this.clusters_.slice();this.clusters_=[],this.resetViewport_(!1),this.redraw_(),setTimeout(function(){var t;for(t=0;t<e.length;t++)e[t].remove()},0)},MarkerClusterer.prototype.getExtendedBounds=function(t){var e=this.getProjection(),r=new google.maps.LatLng(t.getNorthEast().lat(),t.getNorthEast().lng()),s=new google.maps.LatLng(t.getSouthWest().lat(),t.getSouthWest().lng()),i=e.fromLatLngToDivPixel(r);i.x+=this.gridSize_,i.y-=this.gridSize_;var o=e.fromLatLngToDivPixel(s);o.x-=this.gridSize_,o.y+=this.gridSize_;var n=e.fromDivPixelToLatLng(i),a=e.fromDivPixelToLatLng(o);return t.extend(n),t.extend(a),t},MarkerClusterer.prototype.redraw_=function(){this.createClusters_(0)},MarkerClusterer.prototype.resetViewport_=function(t){var e,r;for(e=0;e<this.clusters_.length;e++)this.clusters_[e].remove();for(this.clusters_=[],e=0;e<this.markers_.length;e++)(r=this.markers_[e]).isAdded=!1,t&&r.setMap(null)},MarkerClusterer.prototype.distanceBetweenPoints_=function(t,e){var r=(e.lat()-t.lat())*Math.PI/180,s=(e.lng()-t.lng())*Math.PI/180,i=Math.sin(r/2)*Math.sin(r/2)+Math.cos(t.lat()*Math.PI/180)*Math.cos(e.lat()*Math.PI/180)*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)))},MarkerClusterer.prototype.isMarkerInBounds_=function(t,e){return e.contains(t.getPosition())},MarkerClusterer.prototype.addToClosestCluster_=function(t){var e,r,s,i,o=4e4,n=null;for(e=0;e<this.clusters_.length;e++)(i=(s=this.clusters_[e]).getCenter())&&(r=this.distanceBetweenPoints_(i,t.getPosition()))<o&&(o=r,n=s);n&&n.isMarkerInClusterBounds(t)?n.addMarker(t):((s=new Cluster(this)).addMarker(t),this.clusters_.push(s))},MarkerClusterer.prototype.createClusters_=function(t){var e,r,s,i=this;if(this.ready_){0===t&&(google.maps.event.trigger(this,"clusteringbegin",this),void 0!==this.timerRefStatic&&(clearTimeout(this.timerRefStatic),delete this.timerRefStatic)),s=3<this.getMap().getZoom()?new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),this.getMap().getBounds().getNorthEast()):new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472,-178.48388434375),new google.maps.LatLng(-85.08136444384544,178.00048865625));var o=this.getExtendedBounds(s),n=Math.min(t+this.batchSize_,this.markers_.length);for(e=t;e<n;e++)!(r=this.markers_[e]).isAdded&&this.isMarkerInBounds_(r,o)&&(!this.ignoreHidden_||this.ignoreHidden_&&r.getVisible())&&this.addToClosestCluster_(r);n<this.markers_.length?this.timerRefStatic=setTimeout(function(){i.createClusters_(n)},0):(delete this.timerRefStatic,google.maps.event.trigger(this,"clusteringend",this))}},MarkerClusterer.prototype.extend=function(t,e){return function(t){var e;for(e in t.prototype)this.prototype[e]=t.prototype[e];return this}.apply(t,[e])},MarkerClusterer.CALCULATOR=function(t,e){for(var r=0,s=t.length.toString(),i=s;0!==i;)i=parseInt(i/10,10),r++;return{text:s,index:r=Math.min(r,e),title:""}},MarkerClusterer.BATCH_SIZE=2e3,MarkerClusterer.BATCH_SIZE_IE=500,MarkerClusterer.IMAGE_PATH="https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m",MarkerClusterer.IMAGE_EXTENSION="png",MarkerClusterer.IMAGE_SIZES=[53,56,66,78,90];