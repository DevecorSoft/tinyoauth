exports.user_id_supplier = {
    generate_user_id() {
        return require("crypto").randomUUID()
    }
}