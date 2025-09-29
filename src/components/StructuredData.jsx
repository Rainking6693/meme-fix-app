import { Helmet } from 'react-helmet-async';
import {
  generateWebApplicationSchema,
  generateMemeSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema
} from '../utils/structuredData';

const StructuredData = ({ 
  type = 'homepage', 
  memeData = null, 
  expense = null,
  breadcrumbs = null 
}) => {
  const getSchemaData = () => {
    const schemas = [];

    // Always include organization schema
    schemas.push(generateOrganizationSchema());

    switch (type) {
      case 'homepage':
        schemas.push(generateWebApplicationSchema());
        schemas.push(generateFAQSchema());
        schemas.push(generateHowToSchema());
        break;
        
      case 'meme':
        if (memeData && expense) {
          schemas.push(generateMemeSchema(memeData, expense));
        }
        break;
        
      case 'about':
        // Add specific schemas for about page if needed
        break;
        
      default:
        schemas.push(generateWebApplicationSchema());
    }

    // Add breadcrumb schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    return schemas;
  };

  const schemas = getSchemaData();

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </Helmet>
  );
};

export default StructuredData;