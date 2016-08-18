function formatSeconds(value) {
	var theTime = parseInt(value);
	// 秒
	var theTime1 = 0;
	// 分
	var theTime2 = 0;
	// 小时 // alert(theTime);
	if (theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		// alert(theTime1+"-"+theTime);
		if (theTime1 > 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}
	var result = "" + parseInt(theTime) + "";
	if (result < 10) {
		var result = "0" + parseInt(theTime) + "";
		if (10 > theTime1 > 0) {
			result = "0" + parseInt(theTime1) + ":" + result;
		} else {
			result = "" + parseInt(theTime1) + ":" + result;
		}
		if (theTime2 > 0) {
			result = "" + parseInt(theTime2) + ":" + result;
		}
		return result;
	} else {
		if (10 > theTime1 > 0) {
			result = "0" + parseInt(theTime1) + ":" + result;
		} else {
			result = "" + parseInt(theTime1) + ":" + result;
		}
		if (theTime2 > 0) {
			result = "" + parseInt(theTime2) + ":" + result;
		}
		return result;
	}
}

function alipay(subject, body, amount, days) {
	var aliPay = api.require('aliPay');
	var tradeNO = (new Date()).valueOf();
	api.getPrefs({
		key : 'user'
	}, function(ret, err) {
		var userName = ret.value;
		if (userName && userName != "") {
			if (api.systemType == 'ios') {

				aliPay.config({
					partner : '2088221648908651',
					seller : 'jiepaiapp@qq.com',
					rsaPriKey : keyios,
					rsaPubKey : key2,
					notifyURL : 'http://114.55.98.130/'
				}, function(ret, err) {
					if (ret) {

						aliPay.pay({
							subject : subject,
							body : body,
							amount : amount,
							tradeNO : tradeNO
						}, function(ret, err) {
							var status = ret.code
							switch (status) {
								case 9000:
									x = "支付成功";

									break;
								case 4000:
									x = "系统异常";
									break;
								case 4001:
									x = "数据格式不正确";
									break;
								case 4003:
									x = "该用户绑定的支付宝账户被冻结或不允许支付";
									break;
								case 4004:
									x = "该用户已解除绑定";
									break;
								case 4005:
									x = "绑定失败或没有绑定";
									break;
								case 4006:
									x = "订单支付失败";
									break;
								case 4010:
									x = "重新绑定账户";
									break;
								case 6000:
									x = "支付服务正在进行升级操作";
									break;
								case 6001:
									x = "用户中途取消支付操作";
									break;
							}
							api.ajax({
								url : Api + 'orders.html',
								method : 'post',
								timeout : 30,
								dataType : 'text',
								returnAll : false,
								data : {
									values : {
										username : userName,
										subject : subject,
										body : body,
										subject : subject,
										days : days,
										amount : amount,
										tradeNO : tradeNO,
										states : status
									},
								}
							}, function(ret, err) {
								if (ret == 1) {
									api.alert({
										title : '支付结果',
										msg : mss,
										buttons : ['确定']
									});
								} else {
									api.alert({
										title : '支付结果',
										msg : mss,
										buttons : ['确定']
									});
								}
							});

							api.alert({
								title : '支付结果',
								msg : x,
								buttons : ['确定']
							});
						});
					}
				});
			} else {

				aliPay.config({
					partner : '2088221648908651',
					seller : 'jiepaiapp@qq.com',
					rsaPriKey : key1,
					rsaPubKey : key2,
					notifyURL : 'http://114.55.98.130/'
				}, function(ret, err) {
					if (ret) {

						aliPay.pay({
							subject : subject,
							body : body,
							amount : amount,
							tradeNO : tradeNO
						}, function(ret, err) {
							var status = ret.code

							switch (status) {
								case '9000':
									mss = "支付成功";
									break;
								case '4000':
									mss = "系统异常";
									break;
								case '4001':
									mss = "数据格式不正确";
									break;
								case '4003':
									mss = "该用户绑定的支付宝账户被冻结或不允许支付";
									break;
								case '4004':
									mss = "该用户已解除绑定";
									break;
								case '4005':
									mss = "绑定失败或没有绑定";
									break;
								case '4006':
									mss = "订单支付失败";
									break;
								case '4010':
									x = "重新绑定账户";
									break;
								case '6000':
									mss = "支付服务正在进行升级操作";
									break;
								case '6001':
									mss = "用户中途取消支付操作";
									break;
							}
							api.ajax({
								url : Api + 'orders.html',
								method : 'post',
								timeout : 30,
								dataType : 'text',
								returnAll : false,
								data : {
									values : {
										username : userName,
										subject : subject,
										body : body,
										subject : subject,
										days : days,
										amount : amount,
										tradeNO : tradeNO,

										states : status

									},
								}
							}, function(ret, err) {
								if (ret == 1) {
									api.alert({
										title : '支付结果',
										msg : mss,
										buttons : ['确定']
									});

								} else {
									api.alert({
										title : '支付结果',
										msg : mss,
										buttons : ['确定']
									});

								}
							});

						});
					}
				});

			}

		} else {

			api.confirm({
				title : '快点登录吧？',
				msg : '更多精彩内容登录后查看',
				buttons : ['确定', '取消']
			}, function(ret, err) {
				var index = ret.buttonIndex;
				if (index == 1) {

					login()
				}
			});

		}
	});
}

function login() {
	api.openWin({
		name : 'login_head',
		url : '../../html/login_head.html',
		pageParam : {}
	});
}

function reg() {
	api.openWin({
		name : 'reg',
		url : '../../html/reg.html',
		pageParam : {}
	});
}

function timest() {
	var tmp = Date.parse(new Date()).toString();
	tmp = tmp.substr(0, 10);
	return tmp;
}

var keyios = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOA6VU1gAkeXsXjvE7ZkbFJh25d7niMTL0OT4s0BltNUHchQCUlVepAYa3E3nAXIwoU4SPVAnjT5wpjSoCLy2XNsNOc+y5YdECHOypz7x7cet4zxifaJyyqqHLjWN1zEJ9NEOiGOHyqvu4WJ9eyjeqfU5ybKC7MuTIh+XRKuFHidAgMBAAECgYBukNUXPkxheQ9uDpWtzn8LcG2TmMU1jnQz4mxnomz47/VvnOe3XYr+GsyAG2e4AnLItiRjquVYQgAO021bTlyifV1l/oWxrMefsOAbE2V5rLxS9x2rJ4F/HhIsevM37EL3inKGGU5zIAB5OlP/K+OrptzVlPHtDa1u/vJz1D+eAQJBAPNHWlEJUb00z+4smG73PxB6Ztoxa/thFt1iyxY+OEj/MLNTPyE1//QBdAt/CLjPymTufU7qz73QX1esid9Hcj0CQQDr8/TU0tZ+5lfcwMdl3dUaZBAa05Bw2Fv8gAxBcvTkJZg5jlCSM8FCXlMQZ8udEy659PN86CcYL2Cp9S2ng2XhAkB3Rd1W663CiNkE2aJmjRvDNW+lvCNH3ML8CYquPhUUXOEAmmjSHIp/lBLT7BVXnrCJKZAQF/mAA2ArOPFjocC1AkEAybbOeN8iJmyPcpaQIMLrettOdVCmrAIbaZqiX5WCTETjhVjoAoUiU7XFt0G07TzH9ou1WPQy79cZAVMsS4fmoQJAZyjUUVdpH1sXz7+AocH0FeOrANsdlwz4SJ7ECSc+S4SAQZuMiGGj39hnKVctLYzf1g1B32tLwL2uJ70RLGDteQ=="
var key1 = "MIICXAIBAAKBgQDgOlVNYAJHl7F47xO2ZGxSYduXe54jEy9Dk+LNAZbTVB3IUAlJVXqQGGtxN5wFyMKFOEj1QJ40+cKY0qAi8tlzbDTnPsuWHRAhzsqc+8e3HreM8Yn2icsqqhy41jdcxCfTRDohjh8qr7uFifXso3qn1OcmyguzLkyIfl0SrhR4nQIDAQABAoGAbpDVFz5MYXkPbg6Vrc5/C3Btk5jFNY50M+JsZ6Js+O/1b5znt12K/hrMgBtnuAJyyLYkY6rlWEIADtNtW05con1dZf6FsazHn7DgGxNleay8UvcdqyeBfx4SLHrzN+xC94pyhhlOcyAAeTpT/yvjq6bc1ZTx7Q2tbv7yc9Q/ngECQQDzR1pRCVG9NM/uLJhu9z8QembaMWv7YRbdYssWPjhI/zCzUz8hNf/0AXQLfwi4z8pk7n1O6s+90F9XrInfR3I9AkEA6/P01NLWfuZX3MDHZd3VGmQQGtOQcNhb/IAMQXL05CWYOY5QkjPBQl5TEGfLnRMuufTzfOgnGC9gqfUtp4Nl4QJAd0XdVuutwojZBNmiZo0bwzVvpbwjR9zC/AmKrj4VFFzhAJpo0hyKf5QS0+wVV56wiSmQEBf5gANgKzjxY6HAtQJBAMm2znjfIiZsj3KWkCDC63rbTnVQpqwCG2maol+VgkxE44VY6AKFIlO1xbdBtO08x/aLtVj0Mu/XGQFTLEuH5qECQGco1FFXaR9bF8+/gKHB9BXjqwDbHZcM+EiexAknPkuEgEGbjIhho9/YZylXLS2M39YNQd9rS8C9rie9ESxg7Xk="
var key2 = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgOlVNYAJHl7F47xO2ZGxSYduXe54jEy9Dk+LNAZbTVB3IUAlJVXqQGGtxN5wFyMKFOEj1QJ40+cKY0qAi8tlzbDTnPsuWHRAhzsqc+8e3HreM8Yn2icsqqhy41jdcxCfTRDohjh8qr7uFifXso3qn1OcmyguzLkyIfl0SrhR4nQIDAQAB"
uploadUrl = 'http://114.55.98.130/Public/admin/images/';
Api = 'http://114.55.98.130/index.php/api/'
//判断是否在有效期内的用户
///iid是指视频文件或者图片文件的ID

function isyouxiao(filegrade, iid) {
	api.getPrefs({
		key : 'user'
	}, function(ret, err) {
		var username = ret.value
		api.ajax({
			url : Api + 'userinfo.html',
			method : 'post',
			timeout : 30,
			dataType : 'json',
			returnAll : false,
			data : {
				values : {
					username : username,
				},
			}
		}, function(ret, err) {
			var fname = ret.fname
			var gradexu = ret.xu
			var setgradetime = ret.setgradetime
			var time1 = Number(timest()) - Number(setgradetime);
			var time2 = Math.round(time1 / (60 * 60 * 24));
			var days = ret.days
			var time3 = Number(days) - Number(time2)

			api.ajax({
				url : Api + 'quanji.html',
				method : 'post',
				timeout : 30,
				dataType : 'text',
				returnAll : false,
				data : {
					values : {
						username : username,
						lid : iid

					},
				}
			}, function(ret, err) {

				if (time3 < 0) {
					alert('您的会员已过期请续费');

					return
				} else if (!time3) {
					alert('您还未登录');
					return
				} else if (ret == 0 || gradexu > filegrade) {

					api.sendEvent({
						name : 'quanxian',

					});

				} else {

					alert(fname + '视频，您无权查看该文件，请购买全集或者升级VIP')
					return

				}

			});

		});

	});

}

function goumai() {
	var vid = api.pageParam.vid
	var tradeNO = (new Date()).valueOf();
	var username = api.getPrefs({
		sync : true,
		key : 'user'
	});
	api.ajax({
		url : Api + 'orderlist.html',
		method : 'post',
		timeout : 30,
		dataType : 'text',
		returnAll : false,
		data : {
			values : {
				lid : vid,
				tradeNO : tradeNO,
				username : username
			},
		}
	}, function(ret, err) {
		alert(ret)
	});
}

