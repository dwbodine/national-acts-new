# National Acts Main Website

This is the main www website for nationalactsvip.com.  It is titled "new" because the original was a custom PHP->MySql app on GoDaddy (which was itself ported from the original WordPress).

Interesting points:
- It is a React 19+ app with Typescript running on a NextJS framework
- Uses Bootstrap 5.3 for reactive display
- all data served from api.nationalactsvip.com
- uses a dynamic page router coupled with a routing component at common/PageLoader.tsx which uses API queries to determine what content to display (in this way we can maintain static URL's for clients, eg: https://nationalactsvip.com/winger)
- some limited use of Redux to allow for certain things to be cached
