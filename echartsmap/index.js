var app = new Vue({
	el: '#app',
	data: {
		userChart: null,
	},
	methods: {
		//用户地图
		userMap: function () {
			// var url = './mapData.json';
			// Util.httpGet(url, function (res) {
			if (this.userChart == null) {
				var userDiv = document.getElementById('userMap');
				this.userChart = echarts.init(userDiv);
			}
			var name = 'sd';
			var temp = datas.mapDate; //"";
			var totalData = datas.totalDate;
			var map_data = eval('(' + temp + ')');
			var options = [];
			for (var i = 0; i < 12; i++) {
				var obj = {
					series: [{
						markPoint: {
							symbolSize: 5,
							animation: true,
							large: true,
							symbol: 'circle',
							label: {
								normal: {
									show: false,
								},
								emphasis: {
									show: false,
								},
							},
							itemStyle: {
								normal: {
									show: false,
									borderColor: 'rgba(1, 241, 242, 0.7)',
									borderWidth: 0,
									borderRadius: 50,
								}
							},
							data: map_data[i],
						}
					},
					{
						data: map_data[i],
					}
					]
				}
				options.push(obj);
			}
			echarts.registerMap(name, geoJson);
			option = {
				timeline: {
					axisType: 'category',
					data: ['2点', '4点', '6点', '8点', '10点', '12点', '14点', '16点', '18点', '20点', '22点', '24点'],
					autoPlay: true,
					playInterval: 2000,
					currentIndex: 0,
					left: '0%',
					right: '0%',
					lineStyle: {
						color: '#fff'
					},
					label: {
						normal: {
							textStyle: {
								color: '#fff'
							}
						}
					},
					itemStyle: {
						normal: {
							color: '#fff'

						}
					},
					controlStyle: {
						normal: {
							color: '#fff',
							borderColor: '#fff'

						}
					}
				},
				baseOption: {
					//地图一
					geo: {
						zoom:0.8,
						map: name,
						top: 0,
						left: 0,
						right: 0,
						bottom: 50,
						label: {
							emphasis: {
								show: true
							}
						},
						roam: false,
						itemStyle: {
							normal: {
								areaColor: '#323c48',
								borderColor: '#111'
							},
							emphasis: {
								areaColor: '#2a333d'
							}
						}
					},
					//地图二
					series: [{
						zoom:0.8,
						type: 'map',
						roam: false,
						top: 0,
						left: 0,
						right: 0,
						bottom: 50,
						mapType: name,
						label: {
							normal: {
								show: true,
								textStyle: {
									color: '#fff'
								}
							},
							emphasis: {
								textStyle: {
									color: '#fff'
								}
							}
						},
						label: {
							normal: {
								show: true,
								textStyle: {
									color: '#fff',
									fontSize: 14
								}
							},
							emphasis: {
								show: true,
								textStyle: {
									color: '#fff',
									fontSize: 14
								}
							}
						},
						itemStyle: {
							normal: {
								//							color: 'rgba(1, 241, 242, 0.8)',
								color: {
									type: 'radial',
									x: 0.5,
									y: 0.5,
									r: 0.5,
									colorStops: [{
										offset: 0,
										color: 'rgba(150, 255, 255, 1)' // 0% 处的颜色
									}, {
										offset: 0.7,
										color: 'rgba(50, 241, 242, 0.3)' // 100% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(1, 241, 242, 0)' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								},

								borderColor: '#389BB7',
								//							areaColor: '#8cb8de',
								//							areaColor: 'rgba(0,0,0,0)',
								areaColor: '#000',
							},
							emphasis: {
								borderColor: '#389BB7',
								areaColor: '#000',
								borderWidth: 1
							}
						},
						animation: false,
						data: [],
					}
						, {
						name: '定位',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: [],
						blendMode: 'lighter',
						symbolSize: function (val) {
							return 20;
						},
						showEffectOn: 'render',
						rippleEffect: {
							brushType: 'fill',
							scale: '3',
							period: '5'
						},
						animation: false,
						//						hoverAnimation: true,
						itemStyle: {
							normal: {
								//								color:'rgba(1, 241, 242,0.7)',
								color: {
									type: 'radial',
									x: 0.5,
									y: 0.5,
									r: 0.5,
									colorStops: [{
										offset: 0,
										color: 'rgba(150, 255, 255, 0)' // 0% 处的颜色
									}, {
										offset: 0.9,
										color: 'rgba(50, 241, 242, 0.0)' // 100% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(1, 241, 242,0.4)' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								},
								shadowBlur: 20,
								shadowColor: '#rgba(1, 241, 242, 1)',
							}
						},
						zlevel: 10
					}
					]
				},
				options: options
			}
			this.userChart.setOption(option);

			var options = {
				useEasing: true,
				useGrouping: true,
				separator: ',',
				decimal: '.',
				prefix: '',
				suffix: ''
			};
			var startNum = document.getElementById("num").innerHTML.replace(',','');
			// var numChange = new CountUp("num",startNum, totalData[param.currentIndex], 0, 1.0, options);
			var numChange = new CountUp("num",0, totalData[0], 0, 1.0, options);
			numChange.start();
			this.userChart.on('timelinechanged', function(param) {
				console.log(param);
				console.log(totalData);
				numChange.update(totalData[param.currentIndex]);
			})
			// })
		},
	},
	created: function () { },
	mounted: function () {
		this.userMap();
	}
});