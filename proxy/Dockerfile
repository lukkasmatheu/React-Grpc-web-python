FROM envoyproxy/envoy:v1.28-latest
COPY envoy.yaml /etc/envoy/envoy.yaml
RUN chmod go+r /etc/envoy/envoy.yaml
CMD ["envoy", "-c", "/etc/envoy/envoy.yaml"]


# docker build -t envoy:v1 .

# docker run -d --name envoy -p 8000:8000 --network=host ${CONTAINER_ID}  envoy:v1