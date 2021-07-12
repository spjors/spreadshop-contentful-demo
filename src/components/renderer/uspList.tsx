/* eslint-disable @typescript-eslint/camelcase */
import { Link } from 'components/link';

import { TypeUspList } from 'lib/types';
import { Background } from 'components/background';

export const UspList = ({ fields }: TypeUspList) => {
  const { title, details, background, usps, twoColumn, cta} = fields;
  
  var linkProps;
  if (cta) {
    if ("url" in cta.fields.buttonTarget.fields) {
      linkProps = {href: cta.fields.buttonTarget.fields.url};
    } else if ("slug" in cta.fields.buttonTarget.fields) {
      linkProps = {page: cta.fields.buttonTarget}
    }
  }  
  
  return (
    <Background {...background.fields}>
      <div className="px-8 py-20 mx-auto flex flex-wrap flex-col md:flex-row items-start">
        <div className="flex flex-col w-full justify-center items-start">
          <h1 className="pt-4 text-3xl font-medium leading-tight text-gray-900">{title}</h1>
          <div className="leading-relaxed text-lg text-gray-700 py-6">{details}</div>          
          {usps && usps.map(function(usp, idx){
              var linkProps1;
              if (usp.fields.link) {
                if ("url" in usp.fields.link.fields.target.fields) {
                  linkProps1 = {href: usp.fields.link.fields.target.fields.url};
                } else if ("slug" in usp.fields.link.fields.target.fields) {
                  linkProps1 = {page: usp.fields.link.fields.target}
                }
              }
              
              return (
                <div>
                    <h3>{usp.fields.title}</h3>
                    {usp.fields.illustration && 
                      <img src={usp.fields.illustration[0].secure_url} width="200" height="200"/>
                    }
                    {usp.fields.details && 
                      <div>{usp.fields.details}</div>                
                    }   
                    {linkProps1 && 
                      <Link {...linkProps1}>
                        <a className="w-full md:w-auto text-gray-700 font-semibold  px-3 py-2 text-center">
                          {usp.fields.link.fields.text}
                        </a>
                      </Link>
                    }
                  </div>
              )
          })}
          {linkProps && 
            <Link {...linkProps}>
              <a className="w-full md:w-auto bg-yellow-500 text-white font-semibold  px-3 py-2 text-center">
                {cta.fields.buttonLabel}
              </a>
            </Link>
          }
       </div>        
      </div>      
    </Background>      
  );
};