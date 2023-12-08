resource "helm_release" "ingress_nginx_release" {
  name      = "ingress-nginx"
  namespace = kubernetes_namespace.ingress_nginx_namespace.metadata[0].name

  chart      = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"

  depends_on = [
    kubernetes_namespace.ingress_nginx_namespace
  ]
}

resource "helm_release" "cert_manager_release" {
  name      = "cert-manager"
  namespace = kubernetes_namespace.cert_manager_namespace.metadata[0].name

  chart      = "cert-manager"
  repository = "https://charts.jetstack.io"
  version    = "v1.13.2"

  set {
    name  = "installCRDs"
    value = "true"
  }

  depends_on = [
    kubernetes_namespace.cert_manager_namespace
  ]
}

resource "helm_release" "cluster_issuers_release" {
  name      = "cluster-issuers"
  namespace = kubernetes_namespace.cert_manager_namespace.metadata[0].name

  chart  = "../../charts/cluster-issuers/chart"
  values = ["${file("../../charts/cluster-issuers/values.yml")}"]

  depends_on = [
    helm_release.cert_manager_release
  ]
}

resource "helm_release" "oathkeeper_config_release" {
  name      = "oathkeeper-config"
  namespace = "vite-ma-planete"

  chart = "../../charts/oathkeeper-config/chart"

  set {
    name  = "rules.api.notes"
    value = file("../../config/oathkeeper/rules/auth.yaml")
  }
}

resource "helm_release" "consul_release" {
  name      = "consul"
  namespace = kubernetes_namespace.consul_namespace.metadata[0].name

  chart      = "charts/consul"
  repository = "https://github.com/hashicorp/consul-k8s.git"

  depends_on = [
    kubernetes_namespace.consul_namespace
  ]
}
