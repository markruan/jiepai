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

function alipay(subject, body, amount, days, vid, gradexu) {

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
								case '9000':
									mss = "支付成功";

									if (vid) {
										goumai(vid, 0)

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
												gradexu : gradexu,
												states : status

											},
										}
									}, function(ret, err) {

										if (ret == 1) {
											api.closeFrame({
												name : 'goumai'
											});
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
											api.sendEvent({
												name : 'payok',

											})

										}
									});
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

									if (vid) {
										goumai(vid, 0)

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
												gradexu : gradexu,
												states : status

											},
										}
									}, function(ret, err) {

										if (ret == 1) {
											api.closeFrame({
												name : 'goumai'
											});
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
											api.sendEvent({
												name : 'payok',

											})

										}
									});
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

function closePage() {
	api.closeWin({
	});
}

function login() {
	api.openWin({
		name : 'login_head',
		url : 'widget://html/entry/login_head.html',
		pageParam : {}
	});
}

function reg() {
	api.openWin({
		name : 'reg_head',
		url : '../../html/reg/reg_head.html',
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
uploadUrl = 'https://app.yuanweiniu.com/Public/admin/images/';
Api = 'https://app.yuanweiniu.com/index.php/api/';
shareUrl = 'https://app.yuanweiniu.com/page'

function isyouxiao(filegrade, iid, type) {

	var fname = api.pageParam.fname

	api.getPrefs({
		key : 'user'
	}, function(ret, err) {
		if (ret.value) {

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
				console.log(JSON.stringify(ret))
				var gradexu = ret.xu;
				var setgradetime = ret.setgradetime;
				var time1 = Number(timest()) - Number(setgradetime);
				var time2 = Math.round(time1 / (60 * 60 * 24));

				var days = ret.days;
				var time3 = Number(days) - Number(time2);

				api.ajax({
					url : Api + 'quanji.html',
					method : 'post',
					timeout : 30,
					dataType : 'text',
					returnAll : false,
					data : {
						values : {
							username : username,
							lid : iid,
							type : type

						},
					}
				}, function(ret, err) {

					if (time3 < 0 && gradexu < 1 && filegrade > 6) {

						api.openFrame({
							name : 'quanxian',
							url : '../../html/vedio/quanxian.html',
							rect : {
								x : 0,
								y : 0,
								w : api.winWidth,
								h : api.winHeight
							},
							pageParam : {
								//								grade : fname
								grade1 : 'vip'

							}
						});

						return

					} else if (!time3 && !gradexu) {

						api.openFrame({
							name : 'login1',
							url : '../../html/entry/login1.html',
							rect : {
								x : 0,
								y : 0,
								w : api.winWidth,
								h : api.winHeight
							}
						});
						return
					} else if (ret == 0 || gradexu >= filegrade) {

						api.sendEvent({
							name : 'quanxian',

						});

					} else if (filegrade == 7 && gradexu > 1) {

						var vprice = api.pageParam.vprice

						api.ajax({
							url : Api + 'quanji.html',
							method : 'post',
							timeout : 30,
							dataType : 'text',
							returnAll : false,
							data : {
								values : {
									username : username,
									lid : iid,
									type : type

								},
							}
						}, function(ret, err) {

							if (ret == 0) {
								alert(ret)

								api.sendEvent({
									name : 'quanxian',

								});

							} else {

								api.openFrame({
									name : 'goumai',
									url : '../../html/goumai.html',
									rect : {
										x : 0,
										y : 0,
										w : api.winWidth,
										h : api.winHeight
									},
									pageParam : {
										grade : fname,
										danprice : vprice,
										title : api.pageParam.title,
										dangeid : iid

									}
								});
								return

							}

						});

					} else {

						if (gradexu > 1) {
							api.openFrame({
								name : 'quanxian',
								url : '../../html/vedio/quanxian.html',
								rect : {
									x : 0,
									y : 0,
									w : api.winWidth,
									h : api.winHeight
								},
								pageParam : {
									grade : fname
									//								grade : 'vip'

								}
							});

							return

						} else {

							api.openFrame({
								name : 'quanxian',
								url : '../../html/vedio/quanxian.html',
								rect : {
									x : 0,
									y : 0,
									w : api.winWidth,
									h : api.winHeight
								},
								pageParam : {
									//								grade : fname
									grade : 'vip'

								}
							});

							return

						}

					}

				});

			});
		} else {

			api.openFrame({
				name : 'login1',
				url : '../../html/entry/login1.html',
				rect : {
					x : 0,
					y : 0,
					w : api.winWidth,
					h : api.winHeight
				}
			});
			return

		}

	});

}

function goumai(vid, aa) {
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
				username : username,
				type : aa
			},
		}
	}, function(ret, err) {

		if (ret == 0) {
			api.toast({
				msg : '购买成功'
			});

		} else {
			alert('已经购买过了')

		}
	});
}

function imageCache(url) {//图片缓存方法
	var path = url;
	api.imageCache({
		url : url,
	}, function(ret, err) {
		if (ret) {
			path = ret.url;
		}
	});
	return path;
}

function openme() {
	api.openWin({
		name : 'me_head',
		url : '../../html/me/head.html'
	});
}

//微信支付
function weipay(title, price, gradexu, days, vid) {

	//	weilogin()

	var totalFee = price * 100

	var info = $api.getStorage('userinfo');

	var wxPay = api.require('wxPay');
	var tradeNO = (new Date()).valueOf();

	var userName = api.getPrefs({
		sync : true,
		key : 'user'
	});

	wxPay.config({
		apiKey : '',
		mchId : '1390293602',
		partnerKey : 'b040d663f4b9af40c8dce89b0794e8c0',
		notifyUrl : 'www.baidu.com'
	}, function(ret, err) {

		if (ret.status) {
			wxPay.pay({
				description : title,
				totalFee : totalFee,
				tradeNo : tradeNO,
				productId : '12235413214070356458058',
				openId : info.openid
			}, function(ret, err) {

				if (ret.status) {
					if (vid) {
						goumai(vid, 0)

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
								subject : title,
								body : title,
								amount : price,
								tradeNO : tradeNO,
								gradexu : gradexu,
								states : ret.status

							},
						}
					}, function(ret, err) {

						if (ret == 0) {
							api.closeFrame({
								name : 'goumai'
							});
							api.alert({
								title : '支付结果',
								msg : '购买成功'
							});

							api.sendEvent({
								name : 'payok',

							})

						} else {
							api.alert({
								title : '支付结果',
								msg : '购买失败'
							});

						}
					});
				} else {
					if (err.code == -2) {
						api.toast({
							msg : '用户取消订单了'
						});
					}
				}
			});
		} else {
			alert(err.code);
		}
	});

}

function weilogin1() {

	var wx = api.require('wx');
	wx.auth({
		apiKey : ''
	}, function(ret, err) {
		if (ret.status) {

			code = ret.code
			wx.getToken({
				apiKey : '',
				apiSecret : '',
				code : code
			}, function(ret, err) {
				alert(err)
				if (ret.status) {
					var accessToken = ret.accessToken;
					var openId = ret.openId;
					wx.getUserInfo({
						accessToken : accessToken,
						openId : openId
					}, function(ret, err) {
						if (ret.status) {

							$api.setStorage('info', ret);
							api.closeFrame({
								name : api.frameName
							});
							api.toast({
								msg : '登录成功!'
							});
							api.setPrefs({
								key : 'weilogin',
								value : 1
							});

						} else {
							alert(err.code);
						}
					});
				} else {
					alert(err.code);
				}
			});
		} else {
			alert(err.code);
		}
	});

}

function weireg() {

	api.getPrefs({
		key : 'weilogin'
	}, function(ret, err) {
		console.log(JSON.stringify(ret))
		if (ret.value == 1) {
			api.getPrefs({
				sync : false,
				key : 'weixinlogin'
			}, function(ret, err) {
				var info = ret.value
				login1(info.nickname, info.openId)
			});
			api.closeWin({
				name : 'log_head'
			});
			alert('登录成功')

		} else {
			api.showProgress({
				style : 'default',
				animationType : 'fade',
				title : '努力加载中...',
				text : '先喝杯茶...',
				modal : false
			});
			var wx = api.require('wx');
			wx.auth({
				apiKey : ''
			}, function(ret, err) {
				if (ret.status) {
					code = ret.code
					wx.getToken({
						apiKey : '',
						apiSecret : '',
						code : code
					}, function(ret, err) {

						if (ret.status) {

							var accessToken = ret.accessToken;
							var openId = ret.openId;
							wx.getUserInfo({
								accessToken : accessToken,
								openId : openId
							}, function(ret, err) {

								api.setPrefs({
									key : 'weilogin',
									value : 1
								});

								api.setPrefs({
									key : 'weixinlogin',
									value : ret
								});

								var nameVal = ret.nickname
								var openId = ret.openid

								var headimgurl = ret.headimgurl

								if (ret.status) {

									reg1(nameVal, openId, 1, headimgurl)

									//									alert('第一次微信支付需要登录！')
									api.closeWin({
										name : 'log_head'
									});

								} else {
									alert(err.code);
								}
							});
						} else {
							alert(err.code);
						}
					});
				} else {
					api.hideProgress();
					switch (err.code) {
						case 0:

							break;
						case 1:
							alert('用户取消')
							break;
						case 2:
							alert('用户拒绝授权')
							break;
						case 3:
							alert('当前设备未安装微信客户端')
							break;

					}
				}
			});

		}
	});

}

function weilogin() {

	api.getPrefs({
		key : 'weilogin'
	}, function(ret, err) {

		if (ret.value == 1) {
			api.toast({
				msg : '登录'
			});

		} else {
			api.showProgress({
				style : 'default',
				animationType : 'fade',
				title : '努力加载中...',
				text : '先喝杯茶...',
				modal : false
			});
			var wx = api.require('wx');
			wx.auth({
				apiKey : ''
			}, function(ret, err) {
				if (ret.status) {
					code = ret.code
					wx.getToken({
						apiKey : '',
						apiSecret : '',
						code : code
					}, function(ret, err) {
						api.hideProgress();
						if (ret.status) {
							var accessToken = ret.accessToken;
							var openId = ret.openId;
							wx.getUserInfo({
								accessToken : accessToken,
								openId : openId
							}, function(ret, err) {
								if (ret.status) {
									$api.setStorage('info', ret);
									api.closeFrame({
										name : api.frameName
									});

									alert('第一次微信支付需要登录！')
									api.setPrefs({
										key : 'weilogin',
										value : 1
									});

								} else {
									alert(err.code);
								}
							});
						} else {
							alert(err.code);
						}
					});
				} else {

					switch (err.code) {
						case 0:

							break;
						case 1:
							alert('用户取消')
							break;
						case 2:
							alert('用户拒绝授权')
							break;
						case 3:
							alert('当前设备未安装微信客户端')
							break;

					}

				}
			});

		}
	});

}

function jiepay(gname, fname, price, days, gradexu, dangeid, xu) {

	if (xu == 7) {
		api.getPrefs({
			key : 'user'
		}, function(ret, err) {
			var val = ret.value;
			if (val && val != "") {
				var nameVal = ret.value
				api.ajax({
					url : Api + 'userinfo.html',
					method : 'post',
					timeout : 30,
					dataType : 'json',
					returnAll : false,
					data : {
						values : {
							username : nameVal,
						},
					}
				}, function(ret, err) {
					userinfo = ret

					openpay(price, gname, fname, price, days, gradexu, dangeid)

				});
			} else {

				login()
			};
		});

	} else {

		api.getPrefs({
			key : 'user'
		}, function(ret, err) {
			var val = ret.value;
			if (val && val != "") {
				var nameVal = ret.value
				api.ajax({
					url : Api + 'userinfo.html',
					method : 'post',
					timeout : 30,
					dataType : 'json',
					returnAll : false,
					data : {
						values : {
							username : nameVal,
						},
					}
				}, function(ret, err) {
					userinfo = ret

					var price1 = userinfo.price
					var setgradetime = userinfo.setgradetime;
					var time1 = Number(timest()) - Number(setgradetime);
					var time2 = Math.round(time1 / (60 * 60 * 24));
					var days = userinfo.days
					var xu = userinfo.xu
					if (xu == gradexu) {
						alert("您已经购买过了")
						return
					}
					if (xu == 6 && !dangeid) {
						alert("您已经是顶级VIP")
						return
					}
					var time3 = Number(days) - time2
					var aa = Math.round(price1 / days * time2)
					var bb = Number(price) - aa

					if (days <= 0) {
						openpay(price, gname, fname, price, days, gradexu, dangeid)
					} else {
						if (bb < 0) {
							alert("数值错误，请联系管理员")
						} else {
							openpay(bb, gname, fname, price, days, gradexu, dangeid)
						}

					}

				});
			} else {

				login()
			};
		});
	}
}

function openpay(danprice, gname, fname, price, days, gradexu, dangeid) {
	var tradeNO = (new Date()).valueOf();
	var username = api.getPrefs({
		sync : true,
		key : 'user'
	});
	api.ajax({
		url : Api + 'ifgoumai.html',
		method : 'post',
		timeout : 30,
		dataType : 'text',
		returnAll : false,
		data : {
			values : {
				lid : dangeid,
				tradeNO : tradeNO,
				username : username,
				type : 0
			},
		}
	}, function(ret, err) {

		if (ret == 0) {
			alert('已经购买过了')
			return
		} else {
			api.openFrame({
				name : 'goumai',
				url : '../../html/goumai.html',
				rect : {
					x : 0,
					y : 0,
					w : api.winWidth,
					h : api.winHeight
				},
				pageParam : {
					grade : fname,
					danprice : danprice,
					title : gname,
					days : days,
					gradexu : gradexu,
					dangeid : dangeid
				}
			});
		}
	});

}

function fankui() {

	api.getPrefs({
		key : 'user'
	}, function(ret, err) {
		var userName = ret.value
		if (userName) {

			var userid = api.getPrefs({
				sync : true,
				key : 'userid'
			});

			var param = {
				hostName : "jiepaiapp.kf5.com",
				appId : "001580c66bcb5c988f2fb900b35c63c0d0b1d44bfacc193d",
				email : userid + "@qq.com",
				userName : userName,
				//					verifyUserType : 1,
				phone : ""
			};
			var kf5 = api.require('kf5sdk');
			kf5.initKF5(param, callback);

			function callback(ret, err) {
				var params1 = {
					navColor : "#e43252",
					textColor : "#FFFFFF",
					centerTextSize : 16,
					rightTextSize : 16,
					centerTextVisible : true,
					rightTextVisible : true,
				};
				kf5.setTopBarColor(params1);
				kf5.showRequestList();
			}

		} else {
			alert("请先登录")
			login()
		}
	});

}

function showhelp() {

	api.getPrefs({
		key : 'user'
	}, function(ret, err) {
		var userName = ret.value
		if (userName) {

			var userid = api.getPrefs({
				sync : true,
				key : 'userid'
			});

			var param = {
				hostName : "jiepaiapp.kf5.com",
				appId : "001580c66bcb5c988f2fb900b35c63c0d0b1d44bfacc193d",
				email : userid + "@qq.com",
				userName : userName,
				//					verifyUserType : 1,
				phone : ""
			};
			var kf5 = api.require('kf5sdk');
			kf5.initKF5(param, callback);

			function callback(ret, err) {
				var params1 = {
					navColor : "#e43252",
					textColor : "#FFFFFF",
					centerTextSize : 16,
					rightTextSize : 16,
					centerTextVisible : true,
					rightTextVisible : true,
				};
				kf5.setTopBarColor(params1);
				var params12 = {
					type : 2
				};
				kf5.showHelpCenter(params12);
			}

		} else {
			alert("请先登录")
			login()
		}
	});

}

//找回密码
function findpw() {
	api.openWin({
		name : 'find_head',
		url : '../../html/findpw/find_head.html'
	});
}

function reg1(nameVal, passwordVal, type, icon) {

	api.ajax({
		url : Api + 'reg.html',
		method : 'post',
		timeout : 30,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				username : nameVal,
				password : passwordVal,
				type : type,
				icon : icon

			},
		}
	}, function(ret, err) {
		console.log(JSON.stringify(ret))

		if (ret.status == 0) {
			api.toast({
				msg : ret.msg
			});
			$api.setStorage('userinfo', ret.data);
			api.setPrefs({
				key : 'userinfo',
				value : ret.data.xu
			});
			api.setPrefs({
				key : 'user',
				value : nameVal
			});
			api.sendEvent({
				name : 'reg_login_successEvent',
				extra : {
					user : nameVal,
				}
			});
			api.openWin({
				name : 'home',
				url : '../../html/home.html',
				reload : true
			});
			api.closeWin({
				name : 'reg_head',
			});

		} else if (ret.status == 2) {
 
			login1(nameVal, passwordVal)
		 	api.sendEvent({
				name : 'login_s',
				 
			});

		} else {
			alert(ret.msg);
		}
	});

}

function login1(nameVal, passwordVal) {

	api.ajax({
		url : Api + 'login.html',
		method : 'post',
		timeout : 30,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				username : nameVal,
				password : passwordVal,
			},
		}
	}, function(ret, err) {
		if (ret.status == 1) {
			api.closeFrame({
				name : 'login1'
			});
			api.toast({
				msg : ret.msg
			});
			api.setPrefs({
				key : 'user',
				value : nameVal
			});
			$api.setStorage('userinfo', ret.data);
			api.setPrefs({
				key : 'userinfo',
				value : ret.data.xu
			});
			api.setPrefs({
				key : 'userid',
				value : ret.data.id
			});
			api.sendEvent({
				name : 'reg_login_successEvent',
				extra : {
					user : nameVal,
				}
			});
			api.openWin({
				name : 'home',
				url : '../../html/home.html',
				reload : true
			});
			api.closeWin({
				name : 'login_head',
			});
			api.sendEvent({
				name : 'payok',
			})
			api.execScript({
				name : 'me',
				frameName : 'me',
				script : "int()"
			});
			api.execScript({
				name : 'info',
				frameName : 'edit',
				script : "intt()"
			});
		} else {
			alert(ret.msg)
		}
	});

}

function share(title, description, scene, url) {

	var wx = api.require('wx');
	wx.shareWebpage({
		apiKey : '',
		scene : scene,
		title : title,
		description : description,
		thumb : 'widget://image/logo.png',
		contentUrl : url
	}, function(ret, err) {
		if (ret.status) {
			alert('分享成功');
			guanbi()
		} else {
			switch (err.code) {
				case 0:
					guanbi()
					break;
				case 2:
					alert('用户取消')

					break;
				case 3:
					alert('发送失败')
					break;
				case 4:
					alert('授权拒绝')
					break;
				case 6:
					alert('当前设备未安装微信客户端')
					break;

			}
			guanbi()
		}
	});

}

function chaoshi(time) {
	setTimeout(api.hideProgress, time)

	setTimeout(api.refreshHeaderLoadDone, time)

	setTimeout(function() {
		api.toast({
			msg : '加载超时或暂无数据'
		});

	}, time)

}

//模板函数

function moban(myobj, id) {
	var list = $api.byId(id);
	var html = '';
	for (var i = 0; i < myobj.length; i++) {
		var title = myobj[i].vname;
		var pic = myobj[i].pp
		var pnum = myobj[i].pnum
		var pid = myobj[i].p_id
		var title = myobj[i].pname
		var fname = myobj[i].fname;
		var xu = myobj[i].xu
		var freenum = myobj[i].freenum
		var ftitle = myobj[i].ftitle
		var vurll = myobj[i].purl
		var img = pic.split(' ');
		var zhang = img.length
		var vurl = imageCache(vurll)
		html += '<div onclick="openImg(\'' + pic + '\',' + pid + ',' + freenum + ',' + xu + ',\'' + fname + '\',\'' + pnum + '\')" class="H-display-table-cell H-theme-background-color-white H-float-left  H-box-sizing-border-box H-width-avg-3 H-padding-horizontal-right-4     "  >';
		html += '<img  src="../../image/default.jpg"  data-echo="' + vurl + '" class=" H-float-right H-margin-vertical-top-8 H-margin-horizontal-both-2 H-display-block" alt="" title="" style="width: 96%" ;height:200>';
		html += '<img src="../../image/xia.png " class=" H-float-right  H-margin-vertical-top-8 H-margin-horizontal-both-2 H-display-block" style="margin-top: -200px; height: 200px ; width: 96%" alt="" title="">';
		html += '<div  class=" H-font-size-12" style=" margin-right:8px; margin-top:-30px;line-height: 30px; float: right; color:white ;">' + pnum + '<span>张</span></div>';
		html += '<div class=" H-padding-horizontal-left-5 H-font-size-10 H-padding-vertical-top-10 H-theme-font-color-hhh    " style="line-height: 35px">' + ftitle.substr(0, 10) + '</div>';
		html += '</div>';
	}
	$api.html(list, html);
	api.hideProgress();
	api.refreshHeaderLoadDone();
	echo.init({
		offset : 0,
		throttle : 150,
		unload : false,
		callback : function(element, op) {
		}
	});

}

function mobanv(myobj,id){
	var list = $api.byId(id);
	var html = '';
	for (var i = 0; i < myobj.length; i++) {
					var title = myobj[i].vname;
					var ftitle = myobj[i].ftitle
					var vid = myobj[i].vid;
					var xu = myobj[i].xu;
					var fname = myobj[i].fname;
					var vprice = myobj[i].vprice;
					var vbianhao = myobj[i].vbianhao;
					var pic = myobj[i].vpic;
					var img = pic.split(' ');
					var picc = myobj[i].purl;
					var varr = eval(myobj[i].vurl)
					var vurl = eval(myobj[i].vurl)[0]
					var vvprice = eval(myobj[i].vvprice)
					var totaltime = eval(myobj[i].vtime)[0]
					var piccc=imageCache(picc)
				 
						html += '<div onclick="openV(\'' + vurl + '\' ,\'' + vid + '\',\'' + varr + '\',\'' + title + '\',\'' + vbianhao + '\',\'' + pic + '\' ,\'' + vprice + '\',' + xu + ',\'' + fname + '\',\'' + vprice + '\')" class="H-display-table-cell H-theme-background-color-white H-float-left  H-box-sizing-border-box H-width-avg-3 H-padding-horizontal-right-4 H-margin-vertical-bottom-10   " style="margin-bottom: 10px; ">';
						html += '<img src="../../image/default.jpg"    data-echo="' + piccc + '" class=" H-float-right H-margin-vertical-top-8 H-margin-horizontal-both-2 H-display-block" alt="" title="" style="width: 96%" ;height:200>';
						html += '<img src="../../image/xia.png " class=" H-float-right  H-margin-vertical-top-8 H-margin-horizontal-both-2 H-display-block" style="margin-top: -200px; height: 200px ; width: 96%" alt="" title="">';
						html += '<div  class="H-font-size-12 " style=" margin-right:8px; margin-top:-30px;line-height: 30px; float: right; color:white ;">' + totaltime + '</div>';
						html += '<div class="H-padding-horizontal-left-5 H-font-size-10 H-padding-vertical-top-10    " style="line-height: 35px">' + ftitle.substr(0, 10) + '</div>';
						html += ' </div>';
				 
				}
				$api.html(list, html);
				api.hideProgress();
				api.refreshHeaderLoadDone();
				echo.init({
					offset : 0,
					throttle : 150,
					unload : false,
					callback : function(element, op) {
					}
				});
}
