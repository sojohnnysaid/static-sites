# Static Sites

Simple static HTML pages deployed to the homelab cluster.

## Structure

```
static-sites/
├── sites/
│   ├── product/
│   │   └── index.html
│   └── solutions/
│       └── index.html
└── k8s/
    ├── product/
    │   ├── deployment.yaml
    │   └── service.yaml
    ├── solutions/
    │   ├── deployment.yaml
    │   └── service.yaml
    └── networkpolicy.yaml
```

## Deployment

Deployed via ArgoCD from the [homelab-platform](https://github.com/sojohnnysaid/homelab-platform) repo.

### Manual Deploy

```bash
kubectl apply -k k8s/
```

## Adding a New Site

1. Create a new directory under `sites/`
2. Add your HTML file as `index.html`
3. Create deployment and service in `k8s/<site-name>/`
4. Add resources to `k8s/kustomization.yaml`
5. Update cloudflared config in homelab-platform to add route

## Related Repos

- [homelab-platform](https://github.com/sojohnnysaid/homelab-platform) - Platform infrastructure & ArgoCD apps
