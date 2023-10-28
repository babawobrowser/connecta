export default {
    created() {
        const title = this.$options.title;
        if(title){
            document.title = title;
        }
    }
}