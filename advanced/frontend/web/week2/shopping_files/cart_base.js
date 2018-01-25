define(["require","exports","./ajax","./event","urijs","../options/option_url","../../common/options/option_event_name"],function(t,e,i,n,r,o,a){"use strict";var c=r(location.href),u=c.search(!0)||{},s=Number(u.cart_type)>>0||0,p=0,f=50,_=!0,l=function(){function t(){}return t.prototype.getDefaultCartData=function(){return{cart_type:s,is_html:!0,token:$.cookie("cart_token")}},t.prototype.send=function(t,e,r){var c=$.Deferred();p+=1;var u=!(!r||!r.withCallback),s=this;return i(t,{data:JSON.stringify(e)},r).then(function(t){setTimeout(function(){p-=1,0==p&&c&&c.resolve(t),_&&(s.tracking(t.items),_=!1)},f)},function(e){setTimeout(function(){p-=1,0==p&&(u&&t==o.COMMON_URL.GET_ALL?n.broadcast(a.COMMON_EVENT_NAME.SHOW_ERROR):c&&c.reject(e))},f)}),c.promise()},t.prototype.parseDataDefault=function(t,e){t&&t.resolve(e),_&&(this.tracking(e.items),_=!1)},t.prototype.tracking=function(t){if(t){var e=[],i=[],n=[];$.each(t,function(t,r){e.push(r.sku_id),i.push(r.price),n.push(r.qty)}),window.idigger&&window.idigger.init({type:"cart",pro_idlist:e,pro_pricelist:i,pro_numlist:n})}},t}();return l});
//# sourceMappingURL=cart_base.js.map