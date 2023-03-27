import {
	faAws,
	faBootstrap,
	faCloudflare,
	faDiscourse,
	faDrupal,
	faGithub,
	faGoogle,
	faJava,
	faJoomla,
	faMagento,
	faMicrosoft,
	faPhp,
	faReact,
	faShopify,
	faSquarespace,
	faUbuntu,
	faVimeo,
	faVuejs,
	faWikipediaW,
	faWordpress,
	IconDefinition
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconsByService: { [key: string]: IconDefinition } = {
	wordpress: faWordpress,
	drupal: faDrupal,
	joomla: faJoomla,
	phpbb: faPhp,
	discourse: faDiscourse,
	magento: faMagento,
	shopify: faShopify,
	mediawiki: faWikipediaW,
	squarespace: faSquarespace,
	'google tag manager': faGoogle,
	'google analytics': faGoogle,
	react: faReact,
	'vue.js': faVuejs,
	bootstrap: faBootstrap,
	vimeo: faVimeo,
	cloudflare: faCloudflare,
	'aws-cloudfront': faAws,
	aspnet: faMicrosoft,
	kestrel: faMicrosoft,
	ubuntu: faUbuntu,
	java: faJava,
	php: faPhp,
	github: faGithub,
	'github pages': faGithub,
};

export const ServiceIcon = ({ name }: { name: string }) => {
	const icon = iconsByService[name.toLowerCase()];
	return icon ? <FontAwesomeIcon icon={icon} /> : <></>;
};
