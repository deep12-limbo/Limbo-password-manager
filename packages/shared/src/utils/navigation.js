const handleNavigate = (path, navigate) => {
    if (location.pathname === path) {
        return;
    }

    navigate(path);
};

export default handleNavigate;