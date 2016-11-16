<?php  function __autoload($class_name)
{
	include_once($class_name . '.class.php');
}
$cart = new Cart;
$q = $cart->getCart_small();
?>

<!doctype html>
<html class="no-js">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title> ЛКС - лабораторное и промышленное оборудование</title>
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="css/air-datepicker.css">
	<link rel="stylesheet" type="text/css" href="css/footer.css">
	<link rel="stylesheet" type="text/css" href="css/upload.css">
	<link rel="stylesheet" type="text/css" href="css/tabs.css">

	<!--[if lt IE 9]>
		<script src="scripts/html5shiv.min.js"></script>
		<script src="scripts/html5shiv-printshiv.min.js"></script>
	<![endif]-->

	<script>
		(function(e, t, n){var r=e.querySelectorAll("html")[0];r.className=r.className.replace(/(^|\s)no-js(\s|$)/,"$1js$2")})(document,window,0);
	</script>
</head>

<body>
	<div id="wrap">
		<div class="header">
			<div class="block block-header">
				<img src="img/lks-logo.jpg" class="logo" width="80px" />
				<div class="top-menu" id="top_nav"></div>
			</div>
		</div>
		<div id="main">
			<div id="content">
				<div class="block block-content clearfix">
					<div class="left-menu">
						<div id="cart">
							<?php  echo $q['pageCart']; ?>
						</div>
						<div id="searchFilter">
							<form id="searchForm" action="search.php" method="post">
								<label for="search-type">Search</label>
								<input type="text" id="search-type" name="search" placeholder="Input something"><br>
								<div class="loading_box">
									<!-- <img src="img/preloaders/ajax-loader.gif" alt="Loading"> -->
								</div>
								<div id="log-search"></div>
							</form>
							<form id="main-search-form" action="search.php" class="header-search-form-section" method="post" novalidate="novalidate">
								<div class="header-search-form input-autocomplete">
									<input placeholder="Поиск" class="header-search-input  sel-field-search valid" autocomplete="off" type="text" id="frm-search-text">
									<span class="font-icon icon-zoom header-search-icon">
										<input type="submit" class="header-search-btn" value="">
									</span>
								</div>
								<div class="popup default active" style="display: block; top: 0px; width: 200px; left: 98px;">
									<ul class="search-list"></ul>
								</div>
							</form>
						</div>
					</div>
					<div class="promo-slider">
						<div class="slider-box">
							<ul id="slider">
								<li class="slide"><a href="#"><img src="img/slider/10574.jpg" width="650" height="250"></a></li>
								<li class="slide"><a href="#"><img src="img/slider/6586.jpg" width="650" height="250"></a></li>
								<li class="slide"><a href="#"><img src="img/slider/113.jpg" width="650" height="250"></a></li>
								<li class="slide"><a href="#"><img src="img/slider/113_1.jpg" width="650" height="250"></a></li>
							</ul>
						</div>
					</div>
					<div class="gallery-box">
						<div class="view">
							<figure class="big-image">
								<img src="img/medium/img11.jpg" alt="image11" title="Picture #011">
								<figcaption>Picture #011</figcaption>
								<a href="#" class="prev"></a>
								<a href="#" class="next"></a>
							</figure>
						</div>
						<div class="thumbnails">
							<div class="thumb-prev"><a href="#"></a></div>
							<div class="thumb-next"><a href="#"></a></div>
							<div class="thumbnails-wrapper">
								<ul class="thumbs-list clearfix">
									<li class="thumbs-item current">
										<a href="#"><img src="img/medium/img11.jpg" alt="image11" title="Picture #011"></a>
									</li>
									<li class="thumbs-item">
										<a href="#"><img src="img/medium/img12.jpg" alt="image12" title="Picture #012"></a>
									</li>
									<li class="thumbs-item">
										<a href="#"><img src="img/medium/img13.jpg" alt="image13" title="Picture #013"></a>
									</li>
									<li class="thumbs-item">
										<a href="#"><img src="img/medium/img14.jpg" alt="image14" title="Picture #014"></a>
									</li>
									<li class="thumbs-item">
										<a href="#"><img src="img/medium/img15.jpg" alt="image15" title="Picture #015"></a>
									</li>
									<li class="thumbs-item">
										<a href="#"><img src="img/medium/img16.jpg" alt="image16" title="Picture #016"></a>
									</li>
									<li class="thumbs-item">
										<a href="#"><img src="img/medium/img17.jpg" alt="image17" title="Picture #017"></a>
									</li>
									<li class="thumbs-item">
										<a href="#"><img src="img/medium/img18.jpg" alt="image18" title="Picture #018"></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="filter-aside">
						<form class="filterForm" id="filter-box" enctype="multipart/form-data" action="input.php" method="post">
							<article class="filter-block fltr-price">
								<h3 class="fltr-heading fltr-heading_price">Цена</h3>
								<div class="fltr-body_price">
									<label for="price-from">От:</label>
									<input type="text" name="from" id="price-from" value="1">
									<label for="price-to">до:</label>
									<input type="text" name="to" id="price-to" value="2">
									<input type="hidden" id="price-hidden" value="100" name="price-range">
									<!-- <input type="submit" class="button price_btn" name="price-submit" value="Submit"> -->
									<div class="price-slider"></div>
								</div>
							</article>
							<article class="filter-block fltr-producer">
								<h3 class="fltr-heading fltr-heading_producer">Производитель
									<div class="info-tooltip">
										<span class="info-tooltip_icon">?</span>
										<span class="info-tooltip_content">
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, atque. Aliquid debitis ea corrupti asperiores.</p>
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, atque. Aliquid debitis ea corrupti asperiores.</p>
										</span>
									</div>
								</h3>
								<ul class="list-producer">
									<li class="list-item_producer"><span>
										<input title="A&D" id="producer_1" type="checkbox" name="producer" value="1">
										<label for="producer_1">A&D</label>
									</span></li>
									<li class="list-item_producer"><span>
										<input title="ACOM" id="producer_2" type="checkbox" name="producer" value="2">
										<label for="producer_2">ACOM</label>
									</span></li>
									<li class="list-item_producer"><span>
										<input title="Vesta" id="producer_3" type="checkbox" name="producer" value="3">
										<label for="producer_3">Vesta</label>
									</span></li>
									<li class="list-item_producer hidden inv"><span>
										<input title="Sartorius" id="producer_4" type="checkbox" name="producer" value="4">
										<label for="producer_4">Sartorius</label>
									</span></li>
									<li class="list-item_producer hidden inv"><span>
										<input title="Gosmetr" id="producer_5" type="checkbox" name="producer" value="5">
										<label for="producer_5">Gosmetr</label>
									</span></li>
									<li><a href="#" class="show-all_producer">Показать все</a></li>
								</ul>
							</article>
							<article class="filter-block fltr-scalestype">
								<h3 class="fltr-heading fltr-heading_scalestype">Тип весов
									<div class="info-tooltip">
										<span class="info-tooltip_icon">?</span>
										<span class="info-tooltip_content">
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam repellendus inventore minima, consequatur aperiam velit!</p>
										</span>
									</div>
								</h3>
								<ul class="list-scalestype">
									<li class="list-item_scalestype"><span>
										<input title="Ultramicroscales" id="scalestype_1" type="checkbox" name="scalestype" value="1">
										<label for="scalestype_1">Ультрамикровесы</label>
									</span></li>
									<li class="list-item_scalestype"><span>
										<input title="Microscales" id="scalestype_2" type="checkbox" name="scalestype" value="2">
										<label for="scalestype_2">Микровесы</label>
									</span></li>
									<li class="list-item_scalestype"><span>
										<input title="Analitics-scales" id="scalestype_3" type="checkbox" name="scalestype" value="3">
										<label for="scalestype_3">Аналитические</label>
									</span></li>
									<li class="list-item_scalestype hidden inv"><span>
										<input title="Laboratory-scales" id="scalestype_4" type="checkbox" name="scalestype" value="4">
										<label for="scalestype_4">Лабораторные весы</label>
									</span></li>
									<li class="list-item_scalestype hidden inv"><span>
										<input title="Portion scales" id="scalestype_5" type="checkbox" name="scalestype" value="5">
										<label for="scalestype_5">Порционные весы</label>
									</span></li>
									<li class="list-item_scalestype hidden inv"><span>
										<input title="Counting scales" id="scalestype_6" type="checkbox" name="scalestype" value="6">
										<label for="scalestype_6">Счетные весы</label>
									</span></li>
									<li class="list-item_scalestype hidden inv"><span>
										<input title="Platform scales" id="scalestype_7" type="checkbox" name="scalestype" value="7">
										<label for="scalestype_7">Платформенные весы</label>
									</span></li>
									<li><a href="#" class="show-all_scalestype">Показать все</a></li>
								</ul>
							</article>
						</form>
						<div class="news"> <?php echo $q['cart']; ?> </div>
						<div class="desc-edit">
							<form class="editForm" id="edit-box" enctype="multipart/form-data" action="input.php" method="post">
								<p>
									<textarea id="description" name="decription" placeholder="Input description" rows="5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe soluta provident dolor. Nemo temporibus, nihil velit earum fugit, sit qui distinctio dolor illo, provident tempora sapiente repudiandae impedit possimus. Quas!</textarea>
								</p>
								<p>
									<input name="button" type="submit" value="Сохранить" id="send-desc"> 
								</p>
								<div class="loading_box">
									<img src="img/preloaders/ajax-loader.gif" alt="Loading">
									<span>Loading</span>
								</div>
								<p>
									<span id="resp">Original Description</span>
								</p>
							</form>
						</div>
						<div class="date_container">
							<!-- Air Datepicker -->
							<input id="input_air_pickdate" type="text">
							<!-- <input id="input_alt_pickdate" type="text"> -->
							<div id="air_pickdate"></div>
						</div>
					</div>
					<div class="deals">
						<div class="product">
							<span class="price">1000.-</span>
							<span class="<? $cart->check_product('1'); ?>" id="product_1"></span>
						</div>
						<div class="product">
							<span class="price">2000.-</span>
							<span class="<? $cart->check_product('2'); ?>" id="product_2"></span>
						</div>
						<div class="product">
							<span class="price">3000.-</span>
							<span class="<? $cart->check_product('3'); ?>" id="product_3"></span>
						</div>
						<div class="product">
							<span class="price">4000.-</span>
							<span class="<? $cart->check_product('4'); ?>" id="product_4"></span>
						</div>
						<div class="product">
							<span class="price">5000.-</span>
							<span class="<? $cart->check_product('5'); ?>" id="product_5"></span>
						</div>
					</div>
					<div class="slider-wrap">
						<div class="carousel-header">
							<h2>Brands</h2>
						</div>
						<div class="carousel shadow">
							<div class="carousel-button-left"><a href="#"></a></div>
							<div class="carousel-button-right"><a href="#"></a></div>
							<div class="carousel-wrapper"> 
								<ul class="carousel-items clearfix">
									<li class="carousel-block">
										<a class="q-item-info" href="#">0
											<img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
											<div class="q-item-text"><span>Весы A&D</span></div>
										</a>
									</li>
									<li class="carousel-block">
										<a class="q-item-info" href="#">1
											<img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
											<div class="q-item-text"><span>Весы A&D</span></div>
										</a>
									</li>
									<li class="carousel-block">
										<a class="q-item-info" href="#">2
											<img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
											<div class="q-item-text"><span>Весы A&D</span></div>
										</a>
									</li>
									<li class="carousel-block">
										<a class="q-item-info" href="#">3
											<img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
											<div class="q-item-text"><span>Весы A&D</span></div>
										</a>
									</li>
									<li class="carousel-block">
										<a class="q-item-info" href="#">4
											<img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
											<div class="q-item-text"><span>Весы A&D</span></div>
										</a>
									</li>
									<li class="carousel-block">
										<a class="q-item-info" href="#">5
											<img class="q-item-img" alt="A&D" src="img/and-logo-rus.jpg">
											<div class="q-item-text"><span>Весы A&D</span></div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="vendors" id="del_all">
						<button class="modal_cart_btn delete_all_btn">Обнулить корзину</button>
					</div>
					<div class="upload-wrap">
						<form class="uploadform" action="upload.php" method="post" enctype="multipart/form-data">
							<div class="uploadform_zone">
								<svg class="uploadform_icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
									<path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"/>
								</svg>
								<input type="file" class="uploadform_file" name="files[]" id="uploadFile" data-multiple-caption="{count} files selected" multiple>
								<label for="uploadFile"><strong>Выберите файл</strong>
									<span class="uploadform_dragndrop"> или перетащите файл сюда</span>
								</label>
								<button class="uploadform_button" type="submit">Загрузить</button>
							</div>
							<div class="uploadform_uploading">Загружаем&hellip;</div>
							<div class="uploadform_success">Все готово!</div>
							<div class="uploadform_error">Ошибочка!<span></span></div>
						</form>
					</div>
					<div class="tab_wrapper">
						<ul class="tabs">
							<li class="tab tab--active">Description</li>
							<li class="tab">Characteristics</li>
							<li class="tab">Reviews</li>
							<li class="tab">Files</li>
							<li class="tab">Reviews</li>
							<li class="tab">Files</li>
						</ul>
						<div class="tab_content">
							<div class="tab_item tab_item--visible">
								<h2>Tab Heading 1</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ullam explicabo perferendis est pariatur? Vitae?</p>
							</div>
							<div class="tab_item">
								<h2>Tab Heading 2</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum labore laboriosam quo pariatur, soluta omnis doloribus, ullam atque ipsam, corporis voluptate dignissimos officiis minima tempore?</p>
							</div>
							<div class="tab_item">
								<h2>Tab Heading 3</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, commodi? Dicta harum error blanditiis labore eveniet libero, officiis aperiam necessitatibus quibusdam eos! Aspernatur dolore adipisci ratione quos, aliquid laboriosam ad voluptatem? Quas, nisi quisquam aperiam labore quae. Consequuntur ab consequatur qui. Voluptatem soluta ipsam, obcaecati.</p>
							</div>
							<div class="tab_item">
								<h2>Tab Heading 4</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum tempora voluptatem vel. Nesciunt, impedit neque itaque quasi illum non, id ipsam quam. Consequatur nesciunt, quaerat rerum excepturi, obcaecati fuga natus sequi cupiditate ut, cum tempore incidunt amet nam expedita. Ipsum maiores a fugiat sit inventore odit dolores fuga explicabo. Voluptatibus quas, omnis, molestias commodi incidunt quos. Quam vero voluptas voluptatem.</p>
							</div>
							<div class="tab_item">
								<h2>Tab Heading 5</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis harum illum atque nisi, quasi in, laboriosam sint quaerat saepe accusamus.</p>
							</div>
							<div class="tab_item">
								<h2>Tab Heading 6</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi laudantium rerum, reprehenderit praesentium repellat minus officia cum eos veritatis quo, quod natus velit aliquam quisquam quae. Dicta deserunt officia et!</p>
							</div>
						</div>
					</div>
					<div class="tab_container">
						<div class="main_tabs">
							<input class="tab1" id="tab1" type="radio" name="tabs1" checked>
							<label for="tab1" title="Wordpress">Description</label>

							<input class="tab2" id="tab2" type="radio" name="tabs1">
							<label for="tab2" title="Windows">Characteristics</label>

							<input class="tab3" id="tab3" type="radio" name="tabs1">
							<label for="tab3" title="HTML5">Reviews</label>

							<input class="tab4" id="tab4" type="radio" name="tabs1">
							<label for="tab4" title="CSS3">Files</label>

							<section class="content1">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi voluptatem laborum maiores libero quidem aut.</p>
							</section>  
							<section class="content2">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas odit ut minus velit quam doloribus, quod magni tenetur amet maiores, quo quibusdam totam, nisi ratione.</p>
							</section> 
							<section class="content3">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci fuga provident facilis nemo nam veritatis voluptatibus, nulla rerum delectus fugiat quam ipsa quas enim eos modi deserunt? Aut esse, corporis voluptatum nemo cupiditate repellat deserunt vitae libero nostrum magnam dolorum.</p>
							</section> 
							<section class="content4">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorum quam nisi quasi possimus ipsum accusamus dolores recusandae enim impedit modi eligendi consequatur doloremque, optio molestiae culpa odio assumenda ea veniam, facere perferendis quibusdam. Quidem magni, eos eveniet vel. Inventore fugiat delectus provident, quia a. Consequatur aut autem sit magni eos porro quibusdam provident voluptatem.</p>
							</section>
						</div>
					</div>
					<div class="acc_container">
						<div class="acc_panels">
							<div class="acc_panel_title">
								<span>+</span>
								<h2>Panel 1</h2>
							</div>
							<div class="acc_panel_info">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum numquam, provident culpa quidem quaerat, quasi quae cupiditate. Et debitis unde provident perferendis quo consectetur iste sint, sed nam quia eius nisi exercitationem magni, vitae nesciunt harum atque a reiciendis ea. Officia sunt qui, ad quibusdam vero quae nemo quaerat amet veniam commodi eveniet eius reiciendis maxime tenetur velit in porro.</p>
							</div>
							<div class="acc_panel_title">
								<span>+</span>
								<h2>Panel 2</h2>
							</div>
							<div class="acc_panel_info">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat suscipit veritatis saepe voluptatem deserunt. Ea debitis rem, similique aut, maiores aspernatur libero voluptatem cupiditate ipsam.</p>
							</div>
							<div class="acc_panel_title">
								<span>+</span>
								<h2>Panel 3</h2>
							</div>
							<div class="acc_panel_info">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quis repudiandae, rem provident tempore magni earum, consectetur fugit eius quos ea placeat cum accusantium minus! Repudiandae, libero, cum! Sint, accusamus.</p>
							</div>
							<div class="acc_panel_title">
								<span>+</span>
								<h2>Panel 4</h2>
							</div>
							<div class="acc_panel_info">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est sit soluta expedita, sequi ipsam, vero consectetur dolorem hic placeat quos, excepturi tenetur asperiores impedit. Fuga at, voluptatibus amet. Corporis, ex officiis laboriosam culpa enim sapiente.</p>
							</div>
							<div class="acc_panel_title">
								<span>+</span>
								<h2>Panel 5</h2>
							</div>
							<div class="acc_panel_info">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis nemo accusantium totam molestiae necessitatibus, et? Culpa dignissimos accusamus perspiciatis corporis rerum, dolorem unde ipsam cumque. Illum velit laborum recusandae! Pariatur praesentium quo sit quisquam dignissimos, iusto sint, dolorem ad itaque a molestiae voluptatibus minus dolores cum. Consequuntur, optio veniam incidunt!</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="side">111</div>
		</div>
		<div id="footer">
			<div class="footer">
				<div class="block block-footer"></div>
			</div>
		</div>
		<div id="top-link"><a href='#top-link'>Вверх</a></div>
		<!-- Всплывающее окно галереи с увеличенной картинкой -->
		<div class="popup gallery-popup">
			<div class="gallery-popup-content"></div>
			<button type="button" class="popup_close">X</button>
		</div>
		<!-- Модальное окно корзины -->
		<div id="modal_cart">
			<!-- Кнoпкa зaкрыть -->
			<?php echo $q['last']; ?>
			<!-- Сюда добавляется разметка из обработчика -->
		</div>
		<div id="overlay"></div> <!-- Пoдлoжкa -->
	</div>

	<script src="scripts/jquery-1.12.4.min.js"></script>
	<script src="scripts/jquery-ui.min.js"></script>
	<script src="scripts/jquery.air-datepicker.min.js"></script>
	<script src="scripts/1.js"></script>
	<script src="scripts/carousel.js"></script>
	<script src="scripts/cart.js"></script>
	<script src="scripts/datepicker.js"></script>
	<script src="scripts/filter.js"></script>
	<script src="scripts/promo-slider.js"></script>

</body>

</html>
