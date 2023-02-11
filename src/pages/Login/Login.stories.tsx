import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import Login from './Login';
import paths from 'src/constants/paths';
import RegisterLayout from 'src/layouts/RegisterLayout';

export default {
    title: 'pages/Login',
    component: Login
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => {
    return <Login />;
};

export const Primary = Template.bind({});

Primary.story = {
    parameters: {
        reactRouter: {
            routePath: paths.login
        }
    }
};

export const LoginPage: ComponentStory<typeof Login> = () => (
    <RegisterLayout>
        <Login />
    </RegisterLayout>
);
LoginPage.story = {
    parameters: {
        reactRouter: {
            routePath: paths.login
        }
    }
};
