import {
	SiGithub, SiWordpress, SiDrupal, SiJoomla, SiPhp, SiDiscourse, SiMagento,
	SiShopify, SiWikipedia, SiSquarespace, SiGoogletagmanager, SiGoogleanalytics,
	SiReact, SiVuedotjs, SiBootstrap, SiVimeo, SiCloudflare, SiAmazonaws,
	SiMicrosoft, SiCsharp, SiUbuntu, SiOracle, SiNginx, SiGhost, SiKentico,
	SiUmbraco, SiVbulletin, SiWix, SiJekyll, SiHugo, SiAngular, SiJquery, SiD3dotjs,
	SiThreedotjs, SiLodash, SiAxios, SiWistia, SiDisqus, SiYoast, SiApache
} from '@icons-pack/react-simple-icons';

const iconsMap: { [key: string]: React.ComponentType } = {
    angular: SiAngular,
    apache: SiApache,
    aspnet: SiCsharp,
    awscloudfront: SiAmazonaws,
    axios: SiAxios,
    bootstrap: SiBootstrap,
    cloudflare: SiCloudflare,
    discourse: SiDiscourse,
    disqus: SiDisqus,
    d3js: SiD3dotjs,
    drupal: SiDrupal,
    ghost: SiGhost,
    github: SiGithub,
    githubpages: SiGithub,
    googleanalytics: SiGoogleanalytics,
    googletagmanager: SiGoogletagmanager,
    hugo: SiHugo,
    java: SiOracle,
    jekyll: SiJekyll,
    joomla: SiJoomla,
    jquery: SiJquery,
    kestrel: SiMicrosoft,
    kentico: SiKentico,
    lodash: SiLodash,
    mediawiki: SiWikipedia,
    magento: SiMagento,
    nginx: SiNginx,
    php: SiPhp,
    phpbb: SiPhp,
    react: SiReact,
    shopify: SiShopify,
    squarespace: SiSquarespace,
    threedjs: SiThreedotjs,
    ubuntu: SiUbuntu,
    umbraco: SiUmbraco,
    vbulletin: SiVbulletin,
    vimeo: SiVimeo,
    vuejs: SiVuedotjs,
    wistia: SiWistia,
    wix: SiWix,
    wordpress: SiWordpress,
    yoast: SiYoast,
};


export const ServiceIcon = ({ name }: { name: string }) => {
	const normalized = name.toLowerCase().replace(/[\s.-]+/g, '');
	const IconComponent = iconsMap[normalized];

	if (IconComponent === undefined) {
		return (<></>);
	}

	return (<IconComponent />);
};
