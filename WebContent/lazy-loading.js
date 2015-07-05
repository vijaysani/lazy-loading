document.onreadystatechange = function() {
	if (document.readyState == "complete") {
		var lazyLoadManager = {
			isScroll : false,
			url:"request",
			counter : 1,
			init : function() {
				lazyLoadManager.addObservers();
			},
			addObservers : function() {
				window.onscroll = function() {
					if (!lazyLoadManager.isScroll) {
						console.log("window scroll");
						var elem = document.getElementById("lazy-loader").offsetTop;
						var winScroll = window.scrollY;
						var winRes = window.innerHeight;
						currentViewPosition = Math.abs(winScroll - elem);

					/*	console.log("elmoffset", elem);
						console.log("winScroll", winScroll);
						console.log("winRes", winRes);
						console.log("currentViewPosition", currentViewPosition);
*/
						if (winRes > currentViewPosition) {
							lazyLoadManager.isScroll = true;
							lazyLoadManager.lazyload();
						}
					}
				};
			},
			lazyload : function() {
				lazyLoadManager.url=lazyLoadManager.url+lazyLoadManager.counter+".json";
				lazyLoadManager.xmlhttp = new XMLHttpRequest();
				lazyLoadManager.xmlhttp.open("GET",lazyLoadManager.url, true);
				lazyLoadManager.xmlhttp.send();

				lazyLoadManager.xmlhttp.onreadystatechange = function() {
					if (lazyLoadManager.xmlhttp.readyState == 4 && lazyLoadManager.xmlhttp.status == 200) {
						console.log("successful ajax");
						var jsonList = JSON.parse(lazyLoadManager.xmlhttp.response);
						console.log("jsonlist", jsonList);

						lazyLoadManager.isScroll = false;
						console.log("counter ", lazyLoadManager.counter);
						lazyLoadManager.counter++;
						lazyLoadManager.url="request";
						lazyLoadManager.appendedImages(jsonList);
					}

				};
				lazyLoadManager.isScroll = false;
			},
			appendedImages : function(jsonList) {
				var fragment = document.createDocumentFragment();
				var json = jsonList.images;
				for (elem in json) {
					var currentElem=json[elem];
					var image=document.createElement("img");
						image.src=currentElem["src"];
						image.desc=currentElem["description"];
						image.alt=currentElem["altext"];
						fragment.appendChild(image);
				}
				document.getElementById("wrapper").appendChild(fragment);
			}

		};

		lazyLoadManager.init();
	}

};