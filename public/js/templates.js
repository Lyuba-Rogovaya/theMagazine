'use srtict'; 
var navigationTmpL = "",
					latestTmpl = "",
					contributorsTmpl = "",
					contibGalleryTmpl = "",
					popularTmpl = "",
					popularGalleryTmpl = "",
					seondFeaturedArtTmpl = "",
					otherSeondFeaturedArtTmpl = "",
					bottomArcticesTmpl = "",
					articleTmpl = "",
					latestContainerTmpl = "", 
					popularContainerTmpl="",
					contribContainerTmpl="",
					featuredArtTmpl="",
					rubricTmpl = "",
					rubricContainerTmpl = "",
					articleContainerTmpl = "",
					authorContainerTmpl = "",
					authorTmpl = "",
					footerTmpl= "";

navigationTmpL += "				  <nav>";
navigationTmpL += "				   <ul>";
navigationTmpL += "									<li><a href=\"#home\">Home<\/a><\/li>";
navigationTmpL += "									<li><a href=\"#rubric/news\">News<\/a><\/li>";
navigationTmpL += "									<li><a href=\"#rubric/culture\">Culture<\/a><\/li>";
navigationTmpL += "									<li><a href=\"#rubric/book-reviews\">Book reviews<\/a><\/li>";
navigationTmpL += "									<li><a href=\"#rubric/business\">Business<\/a><\/li>";
navigationTmpL += "									<li><a href=\"#rubric/science\">Science<\/a><\/li>";
navigationTmpL += "									<li><a href=\"#rubric/humor\">Humor<\/a><\/li>";
navigationTmpL += "					  <\/ul>";
navigationTmpL += "					<\/nav>";

featuredArtTmpl += "									<section class=\"featured-article\">";
featuredArtTmpl += "											<figure>";
featuredArtTmpl += "													<a href=\"{{article_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt=\"\"><\/a>";
featuredArtTmpl += "											<\/figure>";
featuredArtTmpl += "											<section class=\"description\">";
featuredArtTmpl += "													<p class=\"rubric\"><a href=\"{{rubric_link}}\">{{rubric}}<\/a><\/p>";
featuredArtTmpl += "													<h2><a href=\"{{article_link}}\">{{title}}<\/a><\/h2>";
featuredArtTmpl += "													<div class=\"author\">By: <a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
featuredArtTmpl += "													<p class=\"short_desc\">{{summary}}<\/p>";
featuredArtTmpl += "											<\/section>";
featuredArtTmpl += "								<\/section>";


latestContainerTmpl += "<div class=\"latest-container\">";
latestContainerTmpl += "  <h1 class=\"module-header\">Latest articles<\/h1>";
latestContainerTmpl += "  <div class=\"button-wrapper\"><button class=\"button\">Button<\/button><\/div>			";
latestContainerTmpl += "<\/div>";

latestTmpl += "					<article class=\"latest-article\">";
latestTmpl += "						 <div class=\"info\">";
latestTmpl += "							  <span class=\"timestamp\">{{pub_date}} <\/span>";
latestTmpl += "							  <\/span>";
latestTmpl += "							  <p class=\"rubric\"><a href=\"{{rubric_link}}\">{{rubric}}<\/a><\/p>";
latestTmpl += "						 <\/div>";
latestTmpl += "						 <figure><a href=\"{{article_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt><\/a><\/figure>";
latestTmpl += "						 <div class=\"description\">";
latestTmpl += "							  <h3 class=\"title\"><a href=\"{{article_link}}\">{{title}}<\/a><\/h3>";
latestTmpl += "							  <div class=\"author\">By: <a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
latestTmpl += "							  <p class=\"summary\">{{summary}}<\/p>";
latestTmpl += "						 <\/div>";
latestTmpl += "					<\/article>";

contributorsTmpl += "					<div class=\"contributor\">";
contributorsTmpl += "						 <figure><a href=\"{{author_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt>                               <\/a><\/figure>";
contributorsTmpl += "						 <div class=\"contributor-info\">";
contributorsTmpl += "							  <p class=\"name\"><a href=\"{{author_link}}\">{{author_name}}<\/a><\/p>";
contributorsTmpl += "							  <a href=\"{{article_link}}\" class=\"featured-contrib-art\">{{title}}<\/a>";
contributorsTmpl += "							  <a href=\"{{author_link}}/all-work\" class=\"all-work\">All work >><\/a>";
contributorsTmpl += "						 <\/div>";
contributorsTmpl += "					<\/div>";

contribContainerTmpl += "<div class=\"contributors-container\">";
contribContainerTmpl += "  <ul><\/ul>";
contribContainerTmpl += "<\/div>";

contibGalleryTmpl += "					<li class=\"person\">";
contibGalleryTmpl += "						<figure><a href=\"{{author_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt><\/a><\/figure>";
contibGalleryTmpl += "						<div class=\"person-info\">";
contibGalleryTmpl += "							<a href=\"{{author_link}}\" class=\"name\">{{author_name}}<\/a>";
contibGalleryTmpl += "							<a href=\"{{author_link}}/all-work\" class=\"all-work\">All work >><\/a>";
contibGalleryTmpl += "						<\/div>";
contibGalleryTmpl += "					<\/li>";

popularContainerTmpl += "<div class=\"popular-container\">";
popularContainerTmpl += "  <h1 class=\"module-header\">Top 10 popular articles<\/h1>";
popularContainerTmpl += "  <ol><\/ol>";
popularContainerTmpl += "<\/div>";

popularTmpl += "					<li>";
popularTmpl += "					 	<a href=\"{{article_link}}\" class=\"item\">{{title}}<\/a>";
popularTmpl += "						 <div class=\"author\">By:&nbsp<a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
popularTmpl += "					<\/li>";

popularGalleryTmpl += "					<li class=\"popular-item\">";
popularGalleryTmpl += "						<figure><a href=\"{{title_href}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt><\/a><\/figure>";
popularGalleryTmpl += "						<a href=\"{{article_link}}\" class=\"item\">{{title}}<\/a>";
popularGalleryTmpl += "						<div class=\"author\">By:&nbsp<a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
popularGalleryTmpl += "					<\/li>";

seondFeaturedArtTmpl += "						<div class=\"article-thumb\">";
seondFeaturedArtTmpl += "						  <figure><a href=\"{{article_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\"                                      alt><\/a><\/figure>";
seondFeaturedArtTmpl += "						  <div class=\"description\">";
seondFeaturedArtTmpl += "										<p class=\"rubric\"><a href=\"{{rubric_link}}\">{{rubric}}<\/a><\/p>";
seondFeaturedArtTmpl += "										<h3><a href=\"{{article_link}}\">{{title}}<\/a><\/h3>";
seondFeaturedArtTmpl += "										<div class=\"author\">By:&nbsp<a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
seondFeaturedArtTmpl += "										<p>{{summary}}<\/p>";
seondFeaturedArtTmpl += "						  <\/div>";
seondFeaturedArtTmpl += "						<\/div>";

otherSeondFeaturedArtTmpl += "						<div class=\"article-thumb\">";
otherSeondFeaturedArtTmpl += "						  <div class=\"description\">";
otherSeondFeaturedArtTmpl += "										<p class=\"rubric\"><a href=\"{{rubric_link}}\">{{rubric}}<\/a><\/p>";
otherSeondFeaturedArtTmpl += "										<h3><a href=\"{{article_link}}\">{{title}}<\/a><\/h3>";
otherSeondFeaturedArtTmpl += "										<div class=\"author\">By:&nbsp<a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
otherSeondFeaturedArtTmpl += "										<p>{{summary}}<\/p>";
otherSeondFeaturedArtTmpl += "						  <\/div>";
otherSeondFeaturedArtTmpl += "						<\/div>		";

articleContainerTmpl += "<div class=\"article-wrapper\">";
articleContainerTmpl += "  <h1 class=\"module-header\"><\/h1>";
articleContainerTmpl += "  <div class=\"bottom-articles\">";
articleContainerTmpl += "	   <h3>More form The Magazine<\/h3>";
articleContainerTmpl += "	   <ul><\/ul>";
articleContainerTmpl += "  <\/div>";
articleContainerTmpl += "<\/div>";

articleTmpl += "<article class=\"\">";
articleTmpl += "		<div class=\"rubric\"><a href=\"{{rubric_link}}\">{{rubric}}<\/a><\/div>";
articleTmpl += "  <h2>{{title}}<\/h2>";
articleTmpl += "	 <div class=\"info\">";
articleTmpl += "			 <span class=\"author\">By:&nbsp;<a href=\"{{author_link}}\">{{author_name}}&#44;<\/a><\/span>";
articleTmpl += "				<span class=\"timestamp\">";
articleTmpl += "					 <time datetime=\"\" class=\"time-hour\">{{pub_date}}<\/time>";
articleTmpl += "				<\/span>";
articleTmpl += "		<\/div>";
articleTmpl += "	 <figure><a href=\"\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt=\"\"><\/a><\/figure>";
articleTmpl += "	 <div class=\"art_body\">{{{article_body}}}<\/div>";
articleTmpl += "<\/article>";

bottomArcticesTmpl += "					<li class=\"article-thumb\">";
bottomArcticesTmpl += "						 <figure><a href=\"{{article_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt>                                 <\/a><\/figure>";
bottomArcticesTmpl += "						 <h4><a href=\"{{article_link}}\" class=\"title\">{{title}}<\/a><\/h4>";
bottomArcticesTmpl += "						 <div class=\"author\">By:&nbsp;<a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
bottomArcticesTmpl += "							<div class=\"summary\"><p>{{summary}}<\/p><\/div>";
bottomArcticesTmpl += "					<\/li>";

rubricTmpl += "					<article class=\"rubric-article\">";
rubricTmpl += "						 <div class=\"info\">";
rubricTmpl += "							  <span class=\"timestamp\">{{pub_date}} <\/span>";
rubricTmpl += "							  <\/span>";
rubricTmpl += "							  <p class=\"rubric\"><a href=\"{{rubric_link}}\">{{rubric}}<\/a><\/p>";
rubricTmpl += "						 <\/div>";
rubricTmpl += "						 <figure><a href=\"{{article_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt><\/a><\/figure>";
rubricTmpl += "						 <div class=\"description\">";
rubricTmpl += "							  <h3 class=\"title\"><a href=\"{{article_link}}\">{{title}}<\/a><\/h3>";
rubricTmpl += "							  <div class=\"author\">By: <a href=\"{{author_link}}\">{{author_name}}<\/a><\/div>";
rubricTmpl += "							  <p class=\"summary\">{{summary}}<\/p>";
rubricTmpl += "						 <\/div>";
rubricTmpl += "					<\/article>";

rubricContainerTmpl += "<div class=\"rubric-wrapper\">";
rubricContainerTmpl += "<h1 class=\"module-header\"><\/h1>";
rubricContainerTmpl += "<\/div>";


authorContainerTmpl += "<div class=\"author-wrapper\">";
authorContainerTmpl += "  <h1 class=\"module-header\">{{author_name}}<\/h1>";
authorContainerTmpl += "	            <figure class=\"author-img\"><a href=\"\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt=\"\"><\/a><\/figure>";
authorContainerTmpl += "	            <section class=\"author-bio\">{{{author_bio}}}<\/section>";
authorContainerTmpl += "	            <section class=\"all-work\">"
authorContainerTmpl += "               <h2 class=\"\">All work<\/h2>";
authorContainerTmpl += "             <\/section>";
authorContainerTmpl += "<\/div>";

authorTmpl += "					<article class=\"\">";
authorTmpl += "						 <div class=\"info\">";
authorTmpl += "							  <span class=\"timestamp\">{{pub_date}}<\/span>";
authorTmpl += "							  <\/span>";
authorTmpl += "							  <p class=\"rubric\"><a href=\"{{rubric_link}}\">{{rubric}}<\/a><\/p>";
authorTmpl += "						 <\/div>";
authorTmpl += "						 <figure><a href=\"{{article_link}}\"><img src=\"images\/background\/upfeathersLight.jpg\" data-src=\"{{img_src}}\" alt><\/a><\/figure>";
authorTmpl += "						 <div class=\"description\">";
authorTmpl += "							  <h3 class=\"title\"><a href=\"{{article_link}}\">{{title}}<\/a><\/h3>";
authorTmpl += "							  <p class=\"summary\">{{summary}}<\/p>";
authorTmpl += "						 <\/div>";
authorTmpl += "					<\/article>";

footerTmpl += "<div class=\"site-links-section\">";
footerTmpl +=   "<a href=\"#about-us\">About us<\/a>";
footerTmpl +=   "<a href=\"#contact\">Contact<\/a>";
footerTmpl +=   "<a href=\"#contributors\">Authors<\/a>";
footerTmpl +=   "<a href=\"#\">Careers<\/a>";
footerTmpl += "<\/div>";
footerTmpl += "<p class=\"terms\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<\/p>";
