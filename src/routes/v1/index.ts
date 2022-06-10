import express from 'express';
// import apikey from '../../auth/apikey';
import signup from './access/signup';
import login from './access/login';
import domain from './domain/domain.route';
import country from './domain/country.route'
// import logout from './access/logout';
// import token from './access/token';
// import blogList from './blog/blogList';
// import blogDetail from './blog/blogDetail'; 
// import writer from './blog/writer';
// import editor from './blog/editor';
// import user from './profile/user';
const router = express.Router();

/**
 * @apiDefine DefinedError
 * @apiError BadRequest The <code>040</code> of represent any request which is invoke with bad data, invalid form, invalid format and any validation error occured.
 * @apiError Unauthorized   The <code>041</code> of represent any unauthenticaion event. Tring to access any resource without authentication.
 * @apiError Forbidden/AccessDenied The <code>043</code> of represent any unauthorized event. Tring to accesss the resource which aren't permissible to specific user.
 * @apiError NotFound The <code>044</code> of represent invalid resource or route which aren't available in platform.
 * @apiError MethodNotAllowed The <code>045</code> of represent invalid method. trying to access resource with invalid method.
 */
/**
 * @apiDefine DefinedErrorExample
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  statusCode: 040
 *  message : Email id is required
 * }
 */

// /*-------------------------------------------------------------------------*/
// // Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
// /*-------------------------------------------------------------------------*/
router.get('/', (req, res) => {
  res.send('Application running now!!');
})
router.use('/signup', signup);
router.use('/login', login);
router.use('/domain', domain);
router.use('/country',country)
// router.use('/logout', logout);
// router.use('/token', token);
// router.use('/blogs', blogList);
// router.use('/blog', blogDetail);
// router.use('/writer/blog', writer);
// router.use('/editor/blog', editor);
// router.use('/profile', user);

export default router;
