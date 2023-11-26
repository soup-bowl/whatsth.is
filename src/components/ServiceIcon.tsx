import * as Icons from '@icons-pack/react-simple-icons';

const rewriteIcon: { [key: string]: string } = {
	'githubpages': 'github',
}

export const ServiceIcon = ({ name }: { name: string }) => {
	const normalized = name.toLowerCase().replace(/\s+/g, '');
	const iconNameKey = rewriteIcon[normalized] || normalized;
	const iconName = `Si${iconNameKey.charAt(0).toUpperCase() + iconNameKey.slice(1).toLowerCase()}`;
	const IconComponent = (Icons as any)[iconName] as React.ComponentType | undefined;

	if (IconComponent === undefined) {
		return (<></>);
	}

	return (<IconComponent />);
};
