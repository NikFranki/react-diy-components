let domains = {
    members: '//api.github.com/',
    passport: '//passport2.makeblock.com/',
    category: '//test.tools.mblockapp.makeblock.com/',
};

if (process.env.NODE_ENV !== 'production') {
    domains.members = '//api.github.com/';
    domains.category = '//test.tools.mblockapp.makeblock.com/';
}

export default domains;