class Github {
    constructor () {
        this.client_id = '1053416024d40ab5cc2b';
        this.client_secret = '6588ab4e92599f6babca974c6f00aa732ca661b1';
        this.repo_count = 5;
        this.repo_sort = 'created: asc'
    }

    async getUser (user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}?client_secret=${this.client_secret}`);
        const repResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repo_count}&sort=${this.repo_sort}?client_id=${this.client_id}?client_secret=${this.client_secret}`);
        
        const profileData = await profileResponse.json();
        const repos = await repResponse.json();
        return {
            profileData,
            repos
        }
        
    }
}
