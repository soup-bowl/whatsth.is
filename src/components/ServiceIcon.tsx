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
	faWordpress
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ServiceProps {
	name: string;
}

export function ServiceIcon({ name }: ServiceProps) {
	switch (name.toLowerCase()) {
		case 'wordpress':
			return (<FontAwesomeIcon icon={faWordpress} />);
		case 'drupal':
			return (<FontAwesomeIcon icon={faDrupal} />);
		case 'joomla':
			return (<FontAwesomeIcon icon={faJoomla} />);
		case 'phpbb':
			return (<FontAwesomeIcon icon={faPhp} />);
		case 'discourse':
			return (<FontAwesomeIcon icon={faDiscourse} />);
		case 'magento':
			return (<FontAwesomeIcon icon={faMagento} />);
		case 'shopify':
			return (<FontAwesomeIcon icon={faShopify} />);
		case 'mediawiki':
			return (<FontAwesomeIcon icon={faWikipediaW} />);
		case 'squarespace':
			return (<FontAwesomeIcon icon={faSquarespace} />);
		case 'google tag manager':
		case 'google analytics':
			return (<FontAwesomeIcon icon={faGoogle} />);
		case 'react':
			return (<FontAwesomeIcon icon={faReact} />);
		case 'vue.js':
			return (<FontAwesomeIcon icon={faVuejs} />);
		case 'bootstrap':
			return (<FontAwesomeIcon icon={faBootstrap} />);
		case 'vimeo':
			return (<FontAwesomeIcon icon={faVimeo} />);
		case 'cloudflare':
			return (<FontAwesomeIcon icon={faCloudflare} />);
		case 'aws-cloudfront':
			return (<FontAwesomeIcon icon={faAws} />);
		case 'aspnet':
		case 'kestrel':
			return (<FontAwesomeIcon icon={faMicrosoft} />);
		case 'ubuntu':
			return (<FontAwesomeIcon icon={faUbuntu} />);
		case 'java':
			return (<FontAwesomeIcon icon={faJava} />);
		case 'php':
			return (<FontAwesomeIcon icon={faPhp} />);
		case 'github':
		case 'github pages':
			return (<FontAwesomeIcon icon={faGithub} />);
		default:
			return (<></>);
	}
}
