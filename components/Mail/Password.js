import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

export const PasswordResetEmail = ({ resetUrl }) => (
    <Html>
        <Head />
        <Preview>Reset your password</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Password Reset</Heading>
                <Text style={text}>
                    We received a request to reset your password. If you didn't make this request, you can
                    safely ignore this email.
                </Text>
                <Section style={buttonContainer}>
                    <Button
                        style={{
                            ...button,
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            paddingTop: '12px',
                            paddingBottom: '12px'
                        }}
                        href={resetUrl}
                    >
                        Reset Password
                    </Button>
                </Section>
                <Text style={text}>
                    This link will expire in 1 hour. If you're having trouble clicking the button,
                    copy and paste the URL below into your web browser:
                </Text>

                <Hr style={hr} />
                <Text style={footer}>
                    If you didn't request a password reset, please ignore this email or contact support if you have questions.
                </Text>
            </Container>
        </Body>
    </Html>
);


const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '20px 0',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20, 50, 70, 0.2)',
    margin: '0 auto',
    maxWidth: '600px',
    padding: '20px',
};

const h1 = {
    color: '#1f2937',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '16px',
};

const text = {
    color: '#374151',
    fontSize: '16px',
    margin: '16px 0',
    lineHeight: '24px',
};

const buttonContainer = {
    margin: '24px 0',
};

const button = {
    backgroundColor: '#3b82f6',
    borderRadius: '5px',
    color: '#fff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center',
};

const link = {
    color: '#3b82f6',
    fontSize: '14px',
    wordBreak: 'break-all',
};

const hr = {
    borderColor: '#e5e7eb',
    margin: '26px 0',
};

const footer = {
    color: '#6b7280',
    fontSize: '14px',
    marginTop: '12px',
};